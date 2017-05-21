function TV(name, power, screen, sound) {
    MultimediaDevice.apply(this, arguments);
}

TV.prototype = Object.create(MultimediaDevice.prototype);