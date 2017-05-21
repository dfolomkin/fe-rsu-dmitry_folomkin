function Cookie(name, weight) {
    Sweet.apply(this, arguments);
}

Cookie.prototype = Object.create(Sweet.prototype);

Cookie.prototype.getName = function () {
    return Sweet.prototype.getName.apply(this, arguments) + " cookies";
}