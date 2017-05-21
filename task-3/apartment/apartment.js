function Apartment(rooms) {
    this._rooms = rooms;
}

Apartment.prototype.getRooms = function () {
    var rooms = [];
    for (var i = 0; i < this._rooms.length; i++) {
        rooms[i] = this._rooms[i].getName();
    }
    return rooms.join("; ");
}

Apartment.prototype.findDevice = function (deviceName) {
    var result = "";
    for (var i = 0; i < this._rooms.length; i++) {
        for (var j = 0; j < this._rooms[i]._devices.length; j++) {
            if (this._rooms[i]._devices[j].getName().toLowerCase() == deviceName.toLowerCase()) {
                result += this._rooms[i]._devices[j].getName() + " is in " + this._rooms[i].getName() + "; ";
            }
        }
    }
    if (result == "") {
        result = "No matches found!"
    }
    return console.log(result);
}