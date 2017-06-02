var http = require("http");
var path = require("path");
var fs = require("fs");

var PORT = 8080;
var checkMimeType = true;

var localPath = __dirname;
var libFilename = "/library.json";

server = http.createServer(function (req, res) {
    var now = new Date();
    var filename = req.url || "index.html";
    
    filename = filename === '/' ? "/index.html" : filename;  

    if (filename === "/getLibrary") {
        onGetLibrary(res);
        return;
    }
    /*
    if (filename === '/rateBook') {
        onRateBook(res);
        return;
    }

    if (filename === '/addBook') {
        onAddBook(res);
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
    fs.readFile(localPath, function (err, contents) {
        if (!err) {
            res.setHeader("Content-Length", contents.length);
            if (mimeType != undefined) {
                res.setHeader("Content-Type", mimeType);
            }
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}

function onGetLibrary(res) {
    localPath += libFilename;
    fs.exists(localPath, function (exists) {
        if (exists) {
            fs.readFile(localPath, 'utf8', function (err, data) {
                if (err) throw err;
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(data);
            });
        } else {
            console.log("File not found: " + localPath);
            res.writeHead(404);
            res.end();
        }
    });
}

// fs.writeFile(__dirname + lib2Filename, JSON.stringify(lib2, "", 4), function(err) {
//         if (err) throw err;
//     });

console.log("Starting web server at localhost:" + PORT);