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

Controller.prototype.setRatingById = function (id, rating) {
    this.model.setRatingById(id, rating);
};