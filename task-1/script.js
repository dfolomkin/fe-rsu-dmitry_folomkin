"use strict";

function consoleRec(arr) {
    if (arr.length > 0) {
        console.log(arr.shift());
        consoleRec(arr);
    }
}

consoleRec(["я", "умею", "писать", "рекурсивные", "функции"]);
