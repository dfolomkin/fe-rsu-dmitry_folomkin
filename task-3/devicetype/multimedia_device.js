function MultimediaDevice(name, power, screen, sound) {
    this._screen = screen;
    this._sound = sound;
    this._sleepTimer = 0;
    Device.apply(this, arguments);
}

MultimediaDevice.prototype = Object.create(Device.prototype);

MultimediaDevice.prototype.getScreen = function () {
    return this._screen;
}

MultimediaDevice.prototype.getSound = function () {
    return this._sound;
}

MultimediaDevice.prototype.setTimer = function (time) {
    this._sleepTimer = time;
    console.log(this._name + "'s timer set in " + this._sleepTimer);
}

MultimediaDevice.prototype.timeoutDisable = function () {
    setTimeout(Device.prototype.disable.bind(this), this._sleepTimer);
}
    