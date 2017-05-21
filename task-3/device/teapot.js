function Teapot(name, power, embedded, safety) {
    KitchenDevice.apply(this, arguments);
}

Teapot.prototype = Object.create(KitchenDevice.prototype);