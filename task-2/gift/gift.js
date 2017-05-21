function Gift(sweetArray) {
    this._sweetArray = sweetArray;
    this._totalWeight = 0;
}

Gift.prototype.getWeight = function () {
    return this._totalWeight;
}

Gift.prototype.countWeight = function () {
    this._totalWeight = 0;
    for (var i = 0; i < this._sweetArray.length; i++) {
        this._totalWeight += this._sweetArray[i].getWeight();
    }
}

Gift.prototype.getContent = function () {
    var strArr = [];
    for (var i = 0; i < this._sweetArray.length; i++) {
        strArr[i] = this._sweetArray[i].getName();
    }
    return strArr.join(", ");
}

Gift.prototype.sort = function (criteria) {
    var compareByName = function (a, b) {
        return a.getName().localeCompare(b.getName());
    }
    var compareByWeight = function (a, b) {
        return a.getWeight() - b.getWeight();
    }

    if (criteria == "byName") {
        this._sweetArray.sort(compareByName);
    } else {
        this._sweetArray.sort(compareByWeight);
    }
}

Gift.prototype.find = function (name) {
    for (var i = 0; i < this._sweetArray.length; i++) {
        if (this._sweetArray[i].getName() == name) {
            return this._sweetArray[i].getName() + " " + this._sweetArray[i].getWeight();
        };
        return "no matches found";
    }
}