function Chocolate(name, weight, cacaoPercentage) {
    this._cacaoPercentage = cacaoPercentage;
    Sweet.apply(this, arguments);
}

Chocolate.prototype = Object.create(Sweet.prototype);

Chocolate.prototype.getChocoType = function () {
    var type;
    if (this._cacaoPercentage > 26 || this._cacaoPercentage <= 35) {
        type = "milk";
    } else if (this._cacaoPercentage > 36 || this._cacaoPercentage <= 55) {
        type = "normal";
    } else if (this._cacaoPercentage > 56 || this._cacaoPercentage <= 95) {
        type = "bitter";
    } else {
        type = "not a chocolate";
    }
    return type;
}