function KitchenDevice(name, power, embedded, safety) {
    this._embedded = embedded;
    this._safety = safety;
    Device.apply(this, arguments);
}

KitchenDevice.prototype = Object.create(Device.prototype);

KitchenDevice.prototype.getEmbedded = function () {
    return this._embedded;
}

KitchenDevice.prototype.getSafety = function () {
    return this._safety;
}