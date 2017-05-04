"use strict";

function consoleRec(arr) {
    //clone instead of reference
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        arr2[i] = arr[i];
    }

    if (arr2.length > 0) {
        console.log(arr2.shift());
        consoleRec(arr2);
    }
}

var initArr = ["я", "умею", "писать", "рекурсивные", "функции"];
//check initial array
console.log(initArr);
//execute cutting function
consoleRec(initArr);
//initial array hasn't change
console.log(initArr);