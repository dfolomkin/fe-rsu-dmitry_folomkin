"use strict";

function isAllTrue(source, filterFn) {
    for (var i = 0; i < source.length; i++) {
        if (!filterFn(source[i])) {
            return false;
        }
    }
    return true;
}

function isNumber(val) {
    return typeof val === "number";
}

function isBoolean(val) {
    return typeof val === "boolean";
}

function isString(val) {
    return typeof val === "string";
}

function isObject(val) {
    return typeof val === "object";
}

function isFunction(val) {
    return typeof val === "function";
}

function isUndefined(val) {
    return typeof val === "undefined";
}

var allNumbers = [1, 2, 4, 5, 6, 7, 8];
var someNumbers = [1, 2, "привет", 4, 5, "ololo", 6, 7, 8];
var noNumbers = ["это", "массив", "без", "чисел"];

console.log(isAllTrue(allNumbers, isNumber)); //вернет true
console.log(isAllTrue(someNumbers, isNumber)); //вернет false
console.log(isAllTrue(noNumbers, isNumber)); //вернет false

console.log(isAllTrue(noNumbers, isString)); //вернет true