function Microwave(name, power, embedded, safety) {
    KitchenDevice.apply(this, arguments);
}

Microwave.prototype = Object.create(KitchenDevice.prototype);