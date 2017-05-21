function Candy(name, weight, transparency) {
    this._transparency = transparency;
    Sweet.apply(this, arguments);
}

Candy.prototype = Object.create(Sweet.prototype);

Candy.prototype.isTransparent = function () {
    return this._transparency >= 0.6;
}