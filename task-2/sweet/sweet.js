function Sweet(name, weight) {
    this._name = name;
    this._weight = weight;
}

Sweet.prototype.getName = function () {
    return this._name;
}

Sweet.prototype.getWeight = function () {
    return this._weight;
}