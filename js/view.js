function View(model, controller) {
    this.model = model;
    this.controller = controller;

    this.libraryElement = document.getElementById("library-content");
    this.searchElement = document.getElementById("search-input");
}

View.prototype.init = function () {
    this.showLibrary(this.model.getLibrary());

    var that = this;



    //sibdcribe EventEmitters

    this.model.onSearchInput.subscribe(function (lib) {
        that.showLibrary(lib);
    });

    this.model.onRatingSet.subscribe(function (book) {
        that.updateBook(book);
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
            var rating = target.parentElement.previousSiblingsCount() + 1;
            that.controller.setRatingById(card.getAttribute("id"), rating);
        }
    });
}

View.prototype.createStars = function (int) {
    var stars = document.createElement("div");
    stars.classList.add("rating-bar");

    for (var i = 0; i < 5; i++) {
        var icon = document.createElement("i");
        icon.classList.add("fa");
        icon.setAttribute("aria-hidden", "true");
        var star = document.createElement("div");
        star.classList.add("rating-bar__star");
        if (i < int) {
            icon.classList.add("fa-star");
            //star.classList.add("checked");
        } else {
            icon.classList.add("fa-star-o");
            //star.classList.add("unchecked");
        }
        star.appendChild(icon);
        stars.appendChild(star);
    }    

    return stars;
}

View.prototype.createCard = function (book) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", book.id);

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

View.prototype.showLibrary = function (lib) {
    this.libraryElement.removeAllChildren();
    for (var i = 0; i < lib.length; i++) {
        var card = this.createCard(lib[i]);
        this.libraryElement.appendChild(card);
    }
}

View.prototype.updateBook = function(book) {
    var oldCard = document.getElementById(book.id);
    var nextCard = oldCard.nextElementSibling;
    this.libraryElement.removeChild(oldCard);

    var newCard = this.createCard(book);
    this.libraryElement.insertBefore(newCard, nextCard);
}
