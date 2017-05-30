function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);
}

Controller.prototype.init = function () {
    this.model.init();
    this.view.init();
}

Controller.prototype.filterByText = function (str) {
    this.model.filterByText(str);
}

Controller.prototype.filterByRating = function (int) {
    this.model.filterByRating(int);
}

Controller.prototype.setRatingById = function (id, rating) {
    this.model.setRatingById(id, rating);
}

Controller.prototype.updateBook = function (book) {
    this.model.updateBook(book);
}

Controller.prototype.addBook = function (book) {
    this.model.addBook(book);
}

Controller.prototype.addHistory = function (message, time) {
    this.model.addHistory(message, time);
}