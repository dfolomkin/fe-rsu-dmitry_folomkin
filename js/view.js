function View(model, controller) {
    this.model = model;
    this.controller = controller;

    //object to send into model
    this.book = this.model.getLibrary[0];

    this.libraryElement = document.getElementById("library-content");
    this.searchElement = document.getElementById("search-input");
    this.tabsElement = document.getElementById("library-tabs");

    this.fadeElement = document.getElementById("modal-fade");
    
    this.modalElement = document.getElementById("modal");
    this.modalTitleElement = document.getElementById("modal-title");
    this.modalOkElement = document.getElementById("modal-ok-button");
    this.modalCancelElement = document.getElementById("modal-cancel-button");
    this.modalCrossElement = document.getElementById("modal-cross-button");

    this.modalTitleInputElement = document.getElementById("title-input");
    this.modalAuthorInputElement = document.getElementById("author-input");
    this.modalCoverInputElement = document.getElementById("cover-input");

    this.modalTagInputElement = document.getElementById("tag-input");
    this.modalAddTagElement = document.getElementById("modal-add-tag-button");
    this.modalDropdownTagsElement = document.getElementById("modal-dropdown-tags-button");
    this.modalTagSelectElement = document.getElementById("tag-select");

    this.modalTagSetElement = document.getElementById("tag-set");
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
                    that.showLibrary(that.model.getLibrary());
                    break;
                case 3:
                    that.controller.filterByRating(that.model.STAR_NUMBER);
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
        //add tags
        that.controller.updateBook(that.book);

        that.closeModal();
    });

    this.modalCancelElement.addEventListener("click", function () {
        that.closeModal();
    });

    this.modalCrossElement.addEventListener("click", function () {
        that.closeModal();
    });

    this.modalDropdownTagsElement.addEventListener("click", function () {
        event.stopPropagation();
        that.showSelect();
    });

    this.modalTagSelectElement.addEventListener("click", function () {
        var target = event.target;
        if (target.parentElement.classList.contains("modal__tag-option")) {
            if (target.parentElement.classList.contains("modal__tag-option--checked")) {
                that.closeSelect();
            } else {
                target.parentElement.classList.add("modal__tag-option--checked");
                
                var tagBadge = that.createTagBadge(target.innerHTML);
                that.modalTagSetElement.appendChild(tagBadge);                

                that.closeSelect();
            }
        }
    });

    this.modalElement.addEventListener("click", function () {
        if (that.modalTagSelectElement.style.visibility = "visible") {
            that.closeSelect();
        }
    });

    this.modalTagInputElement.addEventListener("keydown", function () {
        var target = event.target;
        if (event.keyCode == 13) {
            var tagBadge = that.createTagBadge(target.value);
            that.modalTagSetElement.appendChild(tagBadge);
            target.value = "";
        }
    });

    this.modalAddTagElement.addEventListener("click", function () {
        var tagBadge = that.createTagBadge(that.modalTagInputElement.value);
        that.modalTagSetElement.appendChild(tagBadge);
        that.modalTagInputElement.value = "";
    });

    this.modalTagSetElement.addEventListener("click", function () {
        var target = event.target;
        if (target.parentElement.classList.contains("modal__tag-control")) {
            var tagSelectOptions = that.modalTagSelectElement.children;
            for (var i = 0; i < tagSelectOptions.length; i++) {
                var tagInSelect = tagSelectOptions[i].getElementsByClassName("modal__tag-option-name")[0];
                var tagInSet = target.parentElement.parentElement.getElementsByClassName("modal__tag-name")[0];
                if (tagInSelect.innerHTML == tagInSet.innerHTML) {
                    tagInSelect.parentElement.classList.remove("modal__tag-option--checked");
                }
            }            
            that.modalTagSetElement.removeChild(target.parentElement.parentElement);
        }
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

View.prototype.createTagBadge = function (str) {
    var tagBadge = document.createElement("div");
    tagBadge.classList.add("modal__tag");

    var tagName = document.createElement("div");
    tagName.classList.add("modal__tag-name");
    tagName.innerHTML = str;

    var tagControl = document.createElement("div");
    tagControl.classList.add("modal__tag-control");

    var icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-times");
    icon.setAttribute("aria-hidden", "true");

    tagControl.appendChild(icon);
    tagBadge.appendChild(tagName);
    tagBadge.appendChild(tagControl);

    return tagBadge;
}

View.prototype.updateTagSet = function (tags) {
    this.modalTagSetElement.removeAllChildren();

    if (tags.length == 0) {
        var message = document.createElement("label");
        message.classList.add("modal__label");
        message.innerHTML = "No tags yet";
        this.modalTagSetElement.appendChild(message);
    }

    for (var i = 0; i < tags.length; i++) {
        var tagBadge = this.createTagBadge(tags[i]);
        this.modalTagSetElement.appendChild(tagBadge);
    }
}

View.prototype.updateTagSelect = function (allTags, bookTags) {
    this.modalTagSelectElement.removeAllChildren();
    
    for (var i = 0; i < allTags.length; i++) {
        var tagOption = document.createElement("li");
        tagOption.classList.add("modal__tag-option");
        var bookTagsStr = bookTags.join(", ");
        var allTag = allTags[i];
        if (~bookTagsStr.indexOf(allTag)) {
            tagOption.classList.add("modal__tag-option--checked");
        }
        
        var tagOptionIcon = document.createElement("div");
        tagOptionIcon.classList.add("modal__tag-option-icon");

        var icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-check");
        icon.setAttribute("aria-hidden", "true");        

        var tagOptionName = document.createElement("div");
        tagOptionName.classList.add("modal__tag-option-name");
        tagOptionName.innerHTML = allTags[i];

        tagOptionIcon.appendChild(icon);
        tagOption.appendChild(tagOptionIcon);
        tagOption.appendChild(tagOptionName);

        this.modalTagSelectElement.appendChild(tagOption);
    }
}

View.prototype.showModal = function (str, book) {
    this.fadeElement.style.transition = ".2s ease-out";
    this.fadeElement.style.visibility = "visible";
    this.fadeElement.style.backgroundColor = "rgba(0, 0, 0, .8)";
    this.modalElement.style.transition = ".2s ease-out";
    this.modalElement.style.visibility = "visible";
    this.modalElement.style.transform = "scale(1,1)";

    this.modalTitleElement.innerHTML = str;

    this.modalTitleInputElement.value = book.title;
    this.modalAuthorInputElement.value = book.author;
    this.modalCoverInputElement.value = book.image;

    var bookTags = this.model.getBookById(book.id).tags;
    this.updateTagSet(bookTags);

    var allTags = this.model.getAllTags();
    this.updateTagSelect(allTags, bookTags);
}

View.prototype.closeModal = function () {
    this.fadeElement.style.transition = ".05s ease-in";
    this.fadeElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    this.fadeElement.style.visibility = "hidden";

    this.modalElement.style.transition = ".05s ease-in";
    this.modalElement.style.transform = "scale(.5,.5)";
    this.modalElement.style.visibility = "hidden";
}

View.prototype.showSelect = function () {
    this.modalTagSelectElement.style.transition = ".2s ease-out";
    this.modalTagSelectElement.style.visibility = "visible";
    this.modalTagSelectElement.style.height = "120px";
}

View.prototype.closeSelect = function () {
    this.modalTagSelectElement.style.transition = ".2s ease-in";
    this.modalTagSelectElement.style.height = "0";
    this.modalTagSelectElement.style.visibility = "hidden";
}