function Device(name, power) {
    this._name = name;
    this._power = power;
    this._enabled = false;
}

Device.prototype.getName = function () {
    return this._name;
}

Device.prototype.getPower = function () {
    return this._power;
}

Device.prototype.isEnabled = function () {
    return this._enabled;
}

Device.prototype.enable = function () {
    this._enabled = true;
    console.log(this._name, "is on");
}

Device.prototype.disable = function () {
    this.__disabled = false;
    console.log(this._name, "is off");
}