// 1
function logCurrentDay() {
    var date = new Date();
    var str = "Today is: ";
    switch (date.getDay()) {
        case 0:
            str += "Sunday";
            break;
        case 1:
            str += "Monday";
            break;
        case 2:
            str += "Tuesday";
            break;
        case 3:
            str += "Wednesday";
            break;
        case 4:
            str += "Thursday";
            break;
        case 5:
            str += "Friday";
            break;
        case 6:
            str += "Saturday";
            break;
    }
    str += " and now is: " + date.getHours() + ":" + date.getMinutes() + ":" + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();
    console.log(str);
}
logCurrentDay();

//2
function logCurrentDate() {
    var date = new Date();
    console.log("Current date is: " + date.getDate());
}
logCurrentDate();

//3
function logAllFirstSundaysOfJanuary() {
    var str = "January 1 was/will be Sunday in: ";
    var date = new Date();
    for (var year = 2014; year <= 2050; year++) {
        date.setFullYear(year, 1, 1);
        if (date.getDay() == 0) {
            str += year + " ";
        }
    }
    console.log(str);
}
logAllFirstSundaysOfJanuary();

//4
function countDaysUntilNewYear() {
    var currentDate = new Date();
    var newDate = new Date();
    var timeDiff;
    newDate.setFullYear(currentDate.getFullYear() + 1, 0, 1);
    timeDiff = newDate.getTime() - currentDate.getTime();
    return timeDiff / 1000 / 60 / 60 / 24 - 1;
}
console.log("Until New Year: " + countDaysUntilNewYear() + " days");

//5
function isArray(arr) {
    if (typeof arr == "object") {
        return true;
    } else {
        return false;
    }
}
console.log("Is 123 array?", isArray(123));
console.log("Is 'String' array?", isArray("string"));
console.log("Is '[1, 2, 3]' array?", isArray([1, 2, 3]));

//6
function cloneArr(arr) {
    return arr;
}
var a = [1, 2, 3];
var b = cloneArr(a);
console.log("Cloned array: ", b);

//7
function findFrequencyElement(arr) {
    var elements = {};
    var key;
    var maxKey;
    var maxCount = 0;
    for (var i = 0; i < arr.length; i++) {
        key = arr[i];
        if (elements[key] > 0) {
            elements[key] += 1;
        } else {
            elements[key] = 1;
        }
    }
    for (key in elements) {
        if (elements[key] > maxCount) {
            maxKey = key;
            maxCount = elements[key];
        }
    }
    return elements[maxKey];
}
console.log("The most frequent item is: ", findFrequencyElement([1, 2, 2, 3, 4, 5, 3, 3]));

//8
function invertCase(str) {
    var newStr = "";
    for (var i = 0; i < str.length; i++) {
        if ((str.charCodeAt(i) >= 65) && (str.charCodeAt(i) <= 90)) {
            newStr += String.fromCharCode(str.charCodeAt(i) + 32);
        } else if ((str.charCodeAt(i) >= 97) && (str.charCodeAt(i) <= 122)) {
            newStr += String.fromCharCode(str.charCodeAt(i) - 32);
        } else {
            newStr += str[i];
        }
    }
    return newStr;
}
console.log("Inverted string case: ", invertCase("This Word"));

//9
function removeDuplicates(arr) {
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        while (arr.indexOf(arr[i], i + 1) > -1) {
            delete arr[arr.indexOf(arr[i], i + 1)];
        };
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != undefined) {
            arr2.push(arr[i]);
        }
    }
    return arr2;
}
console.log("Array without duplicates: ", removeDuplicates([1, 4, 2, 3, 1, 3, 1, 4]));

//10
function shuffle(arr) {
    var arr2 = [];
    var rnd;
    for (var i = 0; i < arr.length; i++) {
        do {
            rnd = Math.floor(Math.random() * arr.length);
        } while (arr[rnd] == undefined);
        arr2[i] = rnd;
        delete arr[rnd];
    }
    return arr2;
}
console.log("Shuffled array: ", shuffle([1, 2, 3, 4, 5, 6, 7, 8]));

//11
function deleteNulls(arr) {
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        if ((arr[i] == null) || (arr[i] == 0) || (arr[i] == "") || !arr[i] || (arr[i] == undefined) || (isNaN(arr[i]))) {
            delete arr[i];
        }
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != undefined) {
            arr2.push(arr[i]);
        }
    }
    return arr2;
}
console.log("No nulls array: ", deleteNulls([0, 1, null, 2, "", 3, false, 4, undefined, 5, NaN]));

//12
var library = [
    { author: "Bill Gates", title: "The Road Ahead", libraryID: 1254 },
    { author: "Steve Jobs", title: "Walter Isaacson", libraryID: 4264 },
    { author: "Suzanne Collins", title: "Mockingjay: The Final Book of The Hunger Games", libraryID: 3245 }
];
function sortLibrary() {
    function compareElements(a, b) {
        if (a["title"] > b["title"]) return 1;
        if (a["title"] < b["title"]) return -1;
    }
    library.sort(compareElements);
    return library;
}
console.log("Title sorted library: ", sortLibrary(library));

//13
function mergeArrays(arr1, arr2) {
    var arr3 = [];
    arr3 = arr1;
    for (var i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            arr3.push(arr2[i]);
        }
    }
    function sortNum(a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
    };
    arr3.sort(sortNum);
    return arr3;
}
console.log("Merged array: ", mergeArrays([1, 3, 5], [1, 2, 3, 4, 6]));

//14
function removeE(arr, elem) {
    var arr2 = [];
    while (arr.indexOf(elem) >= 0) {
        delete arr[arr.indexOf(elem)];
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != undefined) {
            arr2.push(arr[i]);
        }
    }
    return arr2;
}
console.log("Removed 3 from array: ", removeE([1, 2, 3, 4, 5, 6], 3));

//15
function getRandomE(arr) {
    var rnd = Math.floor(Math.random() * arr.length);
    return arr[rnd];
}
console.log("Got random element: ", getRandomE([1, 2, 3, 4, 5, 6]));

16//
function moveE(arr, elem, newPos) {
    if (arr.indexOf(elem) >= 0) {
        delete arr[arr.indexOf(elem)];
        arr[newPos] = elem;
    }
    return arr;
}
console.log("Moved element: ", moveE([1, 2, 3, 4, 5, 6], 3, 5));

//17
function dateDiff(date1, date2) {
    timeDiff = Date.parse(date2) - Date.parse(date1);
    return timeDiff / 1000 / 60 / 60 / 24 - 1;
}
console.log("Days between two dates: ", dateDiff("2017/04/19", "2017/05/25"));

//18
function maxDate(arr) {
    var maxNo = 0;
    for (var i = 1; i < arr.length; i++) {
        if (Date.parse(arr[i]) > Date.parse(arr[maxNo])) {
            maxNo = i;
        }
    }
    return arr[maxNo];
}
console.log("Max date of this list:", maxDate(["2015/02/01", "2015/02/02", "2015/01/03"]));

//19
function stringToArray(str) {
    var word = "";
    var arr = [];
    for (var i = 0; i < str.length; i++) {
        if (str[i] != " ") {
            word += str[i];
        } else {
            arr.push(word);
            word = "";
        }
    }
    arr.push(word);
    return arr;
}
console.log("String to Array result: ", stringToArray("I will cut this string"));

//20
function capFirst(str) {
    return (str[0].toUpperCase() + str.substring(1, str.length));
}
console.log("String with UP first char: ", capFirst("upper this string!"));
