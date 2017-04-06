// Declare two variables and show them
var a = 2;
var b = 3;
console.log('two variables: ', a, ',', b);

// Write a function that can find triangle's area
function triArea(a, b, c) {
    var p = (a+b+c)/2;
    var s = Math.sqrt(p*(p-a)*(p-b)*(p-c));
    return s;
}
console.log('triangle area: ', triArea(3, 4, 5));

// Write a function that reverse the given array using three kind of loops
function reArray(a) {
    var b = [];
    var i;
        
    for (i = 0; i < a.length; i++) {
        b[i] = a[a.length-i-1];        
    }
    
    var c = [];
    i = 0;
    while (i < b.length) {
        c[i] = b[b.length-i-1];
        i++;
    }
    
    var d = [];
    i = 0;
    do {
        d[i] = c[c.length-i-1];
        i++;
    } while (i < c.length);

    return d;
}
var arr = [2, 8, 5, 1, 4];
console.log('origin array:', arr, '3 times reverse array:', reArray(arr));

// Explain the difference between ++i and i++ with example
var i = 10;
var j = 10;
console.log('i++ returns value before inc:', i++, 'and ++j returns value after inc:', ++j);

// Write a function that checks if the given arguments is positive number or negative number or is 0
function checkSign(x) {
    if (x < 0) {
        return 'negative';
    } else if (x > 0) {
        return 'positive';
    } else {
        return 'zero';
    }
}
console.log(checkSign(-10), checkSign(10), checkSign(0));

// Create a page that asks the user his name and alert it back
function alertBack() {
    var res = prompt('Request name');
    alert('Input name: ' + res);
}

// Write a function that calculates factorial
function fact(x) {
    var res;
    if (x==0) {
        res = 1;
    } else {
        res = x*(fact(x-1));
    }
    return res;
}
console.log('factorial: ', fact(5));