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
    newDate.setFullYear(currentDate.getFullYear() + 1, 0, 1);
    var timeDiff = newDate.getTime() - currentDate.getTime();
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
console.log(isArray(123));
console.log(isArray("string"));
console.log(isArray([1, 2, 3]));

//6
function cloneArr(arr) {
    return arr;
}
var a = [1, 2, 3];
var b = cloneArr(a);
console.log(b);

//7
function findFrequencyElement(arr) {
    var elements = {};
    var key;
    for (var i = 0; i < arr.length; i++) {
        key = arr[i];
        if (elements[key] > 0) {
            elements[key] += 1;
        } else {
            elements[key] = 1;
        }
    }
    var maxKey;
    var maxCount = 0;
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
console.log(invertCase("This Word"));

//9
function removeDuplicates(arr) {
    for (var i = 0; i < arr.length; i++) {
        while (arr.indexOf(arr[i], i + 1) > -1) {
            delete arr[arr.indexOf(arr[i], i + 1)];
        };
    }
    var arr2 = [];
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

