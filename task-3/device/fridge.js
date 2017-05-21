function Fridge(name, power, embedded, safety, height) {
    this._height = height;
    KitchenDevice.apply(this, arguments);
}

Fridge.prototype = Object.create(KitchenDevice.prototype);

Fridge.prototype.getHeight = function () {
    return this._height;
}