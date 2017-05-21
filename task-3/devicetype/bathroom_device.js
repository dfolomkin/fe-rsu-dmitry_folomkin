function BathroomDevice(name, power, insulation) {
    this._insulation = insulation;
    Device.apply(this, arguments);
}

BathroomDevice.prototype = Object.create(Device.prototype);

BathroomDevice.prototype.getInsulation = function () {
    return this._insulation;
}