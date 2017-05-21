function Washer(name, power, insulation) {
    BathroomDevice.apply(this, arguments);
}

Washer.prototype = Object.create(BathroomDevice.prototype);