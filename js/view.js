function View(model, controller) {
    this.model = model;
    this.controller = controller;

    this.libraryElement = document.getElementById("library-content");
    this.searchElement = document.getElementById("search-input");
    this.tabsElement = document.getElementById("library-tabs");
    
    this.fadeElement = document.getElementById("modal-fade");
    this.modalElement = document.getElementById("modal");    
    
    this.modalTitleInputElement = document.getElementById("title-input");
    this.modalAuthorInputElement = document.getElementById("author-input");
    this.modalCoverInputElement = document.getElementById("cover-input");

    this.modalOkElement = document.getElementById("modal-ok-button");
    this.modalCancelElement = document.getElementById("modal-cancel-button");
    this.modalCrossElement = document.getElementById("modal-cross-button");

    this.book = this.model.getLibrary[0];
}

View.prototype.init = function () {
    this.showLibrary(this.model.getLibrary());

    var that = this;



    //sibdcribe EventEmitters

    this.model.onSearchInput.subscribe(function (lib) {
        that.showLibrary(lib);
    });

    this.model.onRatingFilter.subscribe(function (lib) {
        that.showLibrary(lib);
    });

    this.model.onRatingSet.subscribe(function (book) {
        that.updateCard(book);
    });

    this.model.onBookUpdate.subscribe(function (modelBook) {
        that.updateCard(modelBook);
        that.book = modelBook;
    });



    //add EventListeners

    this.searchElement.addEventListener("input", function () {
        var str = that.searchElement.value;

        that.controller.filterByText(str);
    });

    this.tabsElement.addEventListener("click", function () {
        event.preventDefault();
        
        var target = event.target;        

        if (target.parentElement.classList.contains("tabs__item")) {
            var activeTab = that.tabsElement.getElementsByClassName("tabs__item--active")[0];
            activeTab.classList.remove("tabs__item--active");
            target.parentElement.classList.add("tabs__item--active");

            var tabNo = target.parentElement.getSiblingsNo();
            switch (tabNo) {
                case 1:
                    that.showLibrary(that.model.getLibrary());
                    break;
                case 2:
                    that.controller.filterByRating(that.model.STAR_NUMBER);
                    break;
                case 3:
                    that.showLibrary(that.model.getLibrary());
                    break;
                case 4:
                    that.showLibrary(that.model.getLibrary());
                    break;
            }
        }
    });

    this.libraryElement.addEventListener("click", function () {
        var target = event.target;
        if (target.classList.contains("fa")) {
            var card = target.parentElement.parentElement.parentElement;
            var rating = target.parentElement.getSiblingsNo();

            that.controller.setRatingById(card.getAttribute("id"), rating);
        }

        if (target.classList.contains("card__image")) {
            var card = target.parentElement;
            that.book = that.model.getBookById(card.getAttribute("id"));
            that.showModal("Edit Book", that.book);
        }
    });

    this.modalOkElement.addEventListener("click", function () {
        that.book.title = that.modalTitleInputElement.value;
        that.book.author = that.modalAuthorInputElement.value;
        that.book.image = that.modalCoverInputElement.value;

        that.controller.updateBook(that.book);

        that.closeModal();
    });

    this.modalCancelElement.addEventListener("click", function () {
        that.closeModal();
    });

    this.modalCrossElement.addEventListener("click", function () {
        that.closeModal();
    });
}

View.prototype.createStars = function (int) {
    var stars = document.createElement("div");
    stars.classList.add("rating-bar");

    for (var i = 0; i < this.model.STAR_NUMBER; i++) {
        var icon = document.createElement("i");
        icon.classList.add("fa");
        if (i < int) {
            icon.classList.add("fa-star");
        } else {
            icon.classList.add("fa-star-o");
        }
        icon.setAttribute("aria-hidden", "true");

        var star = document.createElement("div");
        star.classList.add("rating-bar__star");

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

View.prototype.updateCard = function (book) {
    var oldCard = document.getElementById(book.id);
    var nextCard = oldCard.nextElementSibling;
    this.libraryElement.removeChild(oldCard);

    var newCard = this.createCard(book);
    this.libraryElement.insertBefore(newCard, nextCard);
}

View.prototype.showModal = function (str, book) {
    this.fadeElement.style.transition = ".2s ease-out";
    this.fadeElement.style.visibility = "visible";
    this.fadeElement.style.backgroundColor = "rgba(0, 0, 0, .8)";
    this.modalElement.style.transition = ".2s ease-out";
    this.modalElement.style.visibility = "visible";
    this.modalElement.style.transform = "scale(1,1)";

    document.getElementById("modal-title").innerHTML = str;
    
    this.modalTitleInputElement.value = book.title;
    this.modalAuthorInputElement.value = book.author;
    this.modalCoverInputElement.value = book.image;

    //tags draw
}

View.prototype.closeModal = function () {
    this.fadeElement.style.transition = ".05s ease-in";
    this.fadeElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    this.fadeElement.style.visibility = "hidden";
        
    this.modalElement.style.transition = ".05s ease-in";
    this.modalElement.style.transform = "scale(.5,.5)";
    this.modalElement.style.visibility = "hidden";
}