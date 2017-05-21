function Notebook(name, power, screen, sound, os) {
    this._os = os;
    MultimediaDevice.apply(this, arguments);
}

Notebook.prototype = Object.create(MultimediaDevice.prototype);

Notebook.prototype.getOS = function () {
    return this._os;
}

Notebook.prototype.enable = function () {
    console.log(this._os, " is loading...");
    setTimeout(MultimediaDevice.prototype.enable.bind(this), 5000);
}