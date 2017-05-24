function View(model, controller) {
    this.model = model;
    this.controller = controller;

    this.libraryElement = document.getElementById("library-content");
    this.searchElement = document.getElementById("search-input");
}

View.prototype.init = function () {
    this.showCards(this.model.getLibrary());

    var that = this;

    //sibdcribe EventEmitters

    this.model.onSearchInput.subscribe(function (lib) {
        that.showCards(lib);
    });

    this.model.onRatingSet.subscribe(function (lib) {
        that.showCards(lib);
    });

    //add EventListeners

    this.searchElement.addEventListener("input", function () {
        var str = that.searchElement.value;
        that.controller.filterByText(str);
    });

    this.libraryElement.addEventListener("click", function () {
        var target = event.target;
        if (target.classList.contains("fa")) {
            var card = target.parentElement.parentElement.parentElement;
            var title = card.getElementsByClassName("card__title");
            var rating = target.previousSiblingsCount() + 1;
            that.controller.setBookRating(title.innerHTML, rating);
        }
    });
}

View.prototype.createStars = function (int) {
    var stars = document.createElement("div");
    stars.classList.add("rating-bar");

    for (var i = 0; i < int; i++) {
        var star = document.createElement("div");
        star.classList.add("rating-bar__star");
        stars.appendChild(star);
        var icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-star");
        icon.setAttribute("aria-hidden", "true");
        star.appendChild(icon);
    }
    for (var i = 0; i < 5 - int; i++) {
        var star = document.createElement("div");
        star.classList.add("rating-bar__star");
        stars.appendChild(star);
        var icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-star-o");
        icon.setAttribute("aria-hidden", "true");
        star.appendChild(icon);
    }

    return stars;
}

View.prototype.createCard = function (book) {
    var card = document.createElement("div");
    card.classList.add("card");

    var cardElem = document.createElement("div");
    cardElem.classList.add("card__image");
    cardElem.style.background = "url('images/" + book.image + "')";
    card.appendChild(cardElem);

    var cardElem = document.createElement("div");
    cardElem.classList.add("card__title");
    cardElem.innerHTML = book.title;
    card.appendChild(cardElem);

    var cardElem = document.createElement("div");
    cardElem.classList.add("card__author");
    cardElem.innerHTML = book.author;
    card.appendChild(cardElem);

    var stars = this.createStars(book.rating);
    card.appendChild(stars);

    return card;
}

View.prototype.showCards = function (lib) {
    this.libraryElement.removeAllChildren();
    for (var i = 0; i < lib.length; i++) {
        var card = this.createCard(lib[i]);
        this.libraryElement.appendChild(card);
    }
}