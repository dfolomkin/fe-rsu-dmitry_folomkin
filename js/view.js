function View(model, controller) {
    this.model = model;
    this.controller = controller;

    this.libraryElement = document.getElementById("library-content");
    this.searchElement = document.getElementById("search-input");
}

View.prototype.init = function () {
    var that = this;

    this.model.onSearchInput.subscribe(function (lib) {
        that.showCards(lib);
    });

    this.searchElement.addEventListener("input", function () {
        var str = that.searchElement.value;
        that.controller.filterByText(str);
    });
}

View.prototype.createCard = function (book) {
    var card = document.createElement("div");
    card.setAttribute("class", "card");

    var cardElem = document.createElement("div");
    cardElem.setAttribute("class", "card__image");
    cardElem.setAttribute("style", "background: url('images/" + book.image + "')");
    card.appendChild(cardElem);

    var cardElem = document.createElement("div");
    cardElem.setAttribute("class", "card__title");
    cardElem.innerHTML = book.title;
    card.appendChild(cardElem);

    var cardElem = document.createElement("div");
    cardElem.setAttribute("class", "card__author");
    cardElem.innerHTML = book.author;
    card.appendChild(cardElem);

    return card;
}

Node.prototype.removeAllChildren = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild)
    }
}

View.prototype.showCards = function (lib) {
    this.libraryElement.removeAllChildren();
    for (var i = 0; i < lib.length; i++) {
        var card = this.createCard(lib[i]);        
        this.libraryElement.appendChild(card);
    }    
}