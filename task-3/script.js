var calculator = (function (initialState) {
    "use strict";

    var curentState = initialState;

    function getResult() {
        return curentState;
    }

    function reset() {
        curentState = 0;
    }

    function add(val) {
        curentState += val;
        return add;
    }

    function substract(val) {
        curentState -= val;
        return substract;
    }

    function multiply(val) {
        curentState *= val;
        return multiply;
    }

    function divide(val) {
        curentState /= val;
        return divide;
    }

    return {
        getResult: getResult,
        reset: reset,
        add: add,
        substract: substract,
        multiply: multiply,
        divide: divide
    };
})(0);

console.log(calculator.getResult());

calculator.add(4);
calculator.substract(1);
console.log(calculator.getResult());

calculator.add(4)(4)(1);
console.log(calculator.getResult());

calculator.substract(2)(2);
console.log(calculator.getResult());

calculator.reset();
console.log(calculator.getResult());