function Room(name, devices) {
    this._name = name;
    this._devices = devices;
}

Room.prototype.getName = function () {
    return this._name;
}

Room.prototype.getDevices = function () {
    var devices = [];
    for (var i = 0; i < this._devices.length; i++) {
        devices[i] = this._devices[i].getName();
    }
    return devices.join("; ");
}

Room.prototype.getPower = function (status) {
    var pow = 0;
    if (!arguments.length) {
        for (var i = 0; i < this._devices.length; i++) {
            pow += this._devices[i].getPower();
        }
    } else {
        for (var i = 0; i < this._devices.length; i++) {
            if (this._devices[i].isEnabled() == status) {
                pow += this._devices[i].getPower();
            }            
        }
    }    
    return pow;
}