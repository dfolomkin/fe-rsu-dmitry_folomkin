function Hairdryer(name, power, insulation) {
    BathroomDevice.apply(this, arguments);
}

Hairdryer.prototype = Object.create(BathroomDevice.prototype);