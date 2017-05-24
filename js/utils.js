Element.prototype.previousSiblingsCount = function () {
    var count = 0;
    var elem = this;
    while (elem.previousElementSibling) {
        count++;
        elem = elem.previousElementSibling;
    }
}

Node.prototype.removeAllChildren = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild)
    }
}
