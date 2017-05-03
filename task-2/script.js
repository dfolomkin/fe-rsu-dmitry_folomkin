function deleteTextNodes(elem) {
    "use strict";
    var i = 0;
    while (elem.childNodes[i] !== undefined) {
        if (elem.childNodes[i].nodeType == 3) {
            elem.removeChild(elem.childNodes[i]);
        } else if (elem.childNodes[i].nodeType == 1) {
            deleteTextNodes(elem.childNodes[i]);
            i++;
        } else {
            i++;
        }
    }
}

if (typeof document !== "undefined") {
    document.getElementById("button1").addEventListener("click", function () {
        deleteTextNodes(document.body);
    });
}