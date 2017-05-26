Element.prototype.getSiblingsNo = function () {
    var count = 0;
    var elem = this;
    while (elem.previousElementSibling) {
        count++;
        elem = elem.previousElementSibling;
    }
    count++;
    return count;
}

Node.prototype.removeAllChildren = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild)
    }
}
