var calculator = (function (initialState) {
    "use strict";

    var curentState = initialState;

    function getResult() {
        return curentState;
    }

    function reset() {
        curentState = 0;
        return this;
    }

    function add(val) {
        curentState += val;
        return this;
    }

    function substract(val) {
        curentState -= val;
        return this;
    }

    function multiply(val) {
        curentState *= val;
        return this;
    }

    function divide(val) {
        curentState /= val;
        return this;
    }

    function requestServer(callback) {
        setTimeout(function () {
            callback()
        }, 2000);
    }

    return {
        getResult: getResult,
        reset: reset,
        add: add,
        substract: substract,
        multiply: multiply,
        divide: divide,
        requestServer: requestServer
    };
})(0);

console.log(calculator.add(4).reset().add(1).getResult());

calculator.requestServer(function () {
    console.log(calculator.getResult())
})

//bind function
function bind(f, context) {
    return function() {
        return f.apply(context, arguments);
    };
}
