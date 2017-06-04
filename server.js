var http = require("http");
var path = require("path");
var fs = require("fs");

var PORT = 8080;
var checkMimeType = true;

var libraryFile = "/library.json";
var libraryPath = __dirname + libraryFile;

server = http.createServer(function (req, res) {
    var now = new Date();
    var filename = req.url || "index.html";
    var reqBody = req
    
    filename = filename === "/" ? "/index.html" : filename;  

    if (filename === "/getLibrary") {
        onGetLibrary(res);
        return;
    }

    if (filename === "/addBook") {
        onAddBook(req, res);
        return;
    }

    /*
    if (filename === "/rateBook") {
        onRateBook(res);
        return;
    }

    
    */
    var ext = path.extname(filename);
    
    var validExtensions = {
        ".js": "application/javascript",
        ".html": "text/html",        
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".eot": "font/eot",        
        ".ttf": "font/ttf",
        ".otf": "font/otf",
        ".woff": "font/woff",
        ".woff2": "font/woff2"
    };

    var localPath = __dirname;
    var validMimeType;
    var mimeType = validExtensions[ext];

    if (checkMimeType) {
        validMimeType = validExtensions[ext] != undefined;
    }

    if (validMimeType) {
        localPath += filename;
        fs.exists(localPath, function (exists) {
            if (exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, mimeType);
            } else {
                console.log("File not found: " + localPath);
                res.writeHead(404);
                res.end();
            }
        });
    } else {
        console.log("Invalid file extension detected: " + ext + " (" + filename + ")")
    }
}).listen(PORT);

function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function (err, content) {
        if (!err) {
            res.setHeader("Content-Length", content.length);
            if (mimeType != undefined) {
                res.setHeader("Content-Type", mimeType);
            }
            res.statusCode = 200;
            res.end(content);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}

function onGetLibrary(res) {
    fs.exists(libraryPath, function (exists) {
        if (exists) {
            fs.readFile(libraryPath, "utf8", function (err, content) {
                if (!err) {
                    res.setHeader("Content-Type", "application/json");
                    res.statusCode = 200;
                    res.end(content);
                } else {
                    //throw err;
                    res.writeHead(500);
                    res.end();
                }                
            });
        } else {
            console.log("File not found: " + libraryFile);
            res.writeHead(404);
            res.end();
        }
    });
}

function onAddBook(req, res) {
    var data = "";
    
    req.on("data", function(chunk) {
        data += chunk.toString();
    });

    req.on("end", function() {
        fs.writeFile(libraryPath, data, function(err) {
            if (!err) {
                res.statusCode = 200;
                res.end("OK");
            } else {
                //throw err;
            }            
        });
    });    
}

console.log("Starting web server at localhost:" + PORT);