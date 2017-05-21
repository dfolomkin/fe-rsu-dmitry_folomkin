function Lamp(name, power) {
    Device.apply(this, arguments);
}

Lamp.prototype = Object.create(Device.prototype);