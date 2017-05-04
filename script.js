"use strict";

function Calculator(initialState) {
    this.curentState = initialState;

	this.setCurrentState = function(state) {
		this.curentState = state;
	};
	
	var f = this.setCurrentState.bind(this);
	
    this.getResult = function() {
        return this.curentState;
    }

    this.reset = function() {
        this.curentState = 0;
        return this;
    }

    this.add = function(val) {
        this.curentState += val;
        return this;
    }

    this.substract = function(val) {
        this.curentState -= val;
        return this;
    }

    this.multiply = function(val) {
        this.curentState *= val;
        return this;
    }

    this.divide = function(val) {
        this.curentState /= val;
        return this;
    }

    this.requestServer = function(callback) {
        setTimeout(function () {
            f(10);
			callback();
        }, 2000);
    }
};

var calc = new Calculator(0);

console.log(calc.add(4).reset().add(1).getResult());

calc.requestServer(function () {
    console.log(calc.getResult())
})

//bind function
function bind(f, context) {
    return function() {
        return f.apply(context, arguments);
    };
}
