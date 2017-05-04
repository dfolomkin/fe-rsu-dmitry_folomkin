"use strict";

function Calculator(initialState) {
    this.curentState = initialState;

    this.setState = function (state) {
        this.curentState = state;
        return this;
    };

    var setState = this.setState.bind(this);

    this.getResult = function () {
        return this.curentState;
    }

    this.reset = function () {
        this.curentState = 0;
        return this;
    }

    this.add = function (val) {
        this.curentState += val;
        return this;
    }

    this.substract = function (val) {
        this.curentState -= val;
        return this;
    }

    this.multiply = function (val) {
        this.curentState *= val;
        return this;
    }

    this.divide = function (val) {
        this.curentState /= val;
        return this;
    }

    this.getInitialState = function (callback) {
        setTimeout(function () {
            setState(10);
            callback();
        }, 2000);
    }
};

var calc = new Calculator(0);
console.log(calc.add(4).reset().add(1).getResult());
//new setter check
console.log(calc.setState(20).getResult());

//server emulation check
calc.getInitialState(function () {
    console.log(calc.getResult())
})

//another instance check
var calc2 = new Calculator(0);
console.log(calc2.setState(40).getResult());

//bind function
function bind(f, context) {
    return function () {
        return f.apply(context, arguments);
    };
}