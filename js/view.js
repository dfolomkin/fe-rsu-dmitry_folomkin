function View(model, controller) {
    this.model = model;
    this.controller = controller;

    //object to send into model
    this.book = {
        id: undefined,
        title: undefined,
        author: undefined,
        image: undefined,
        rating: undefined,
        tags: []
    };

    this.mainNavElement = document.getElementById("main-nav");
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

    this.addItemElement = document.getElementById("add-item-button");

    this.historyBlockElement = document.getElementById("history-block");
}

View.prototype.init = function () {
    var that = this;

    this.controller.getLibrary();

    setInterval(function () {
        that.updateHistoryTimers();
    }, 60000);



    //sibdcribe EventEmitters
    this.model.onGetLibrary.subscribe(function (lib) {
        that.showLibrary(lib);
    });

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
        that.book = modelBook;  //don't need this at all, bcs view.book is in actual state since modal save button was pushed
    });

    this.model.onBookAdd.subscribe(function (lib) {
        that.showLibrary(lib);
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

                    //***************************************************************************************** history
                    var tabName = target.parentElement.parentElement.children[tabNo - 1].getElementsByClassName("tabs__link")[0].innerHTML;
                    var message = "You switched to <b>" + tabName + "</b> tab";
                    that.updateHistoryBlock(message, new Date());
                    that.controller.addHistory(message, new Date());

                    break;
                case 2:
                    that.showLibrary(that.model.getLibrary());
                    break;
                case 3:
                    that.controller.filterByRating(that.model.STAR_NUMBER);

                    //***************************************************************************************** history
                    var tabName = target.parentElement.parentElement.children[tabNo - 1].getElementsByClassName("tabs__link")[0].innerHTML;
                    var message = "You switched to <b>" + tabName + "</b> tab";
                    that.updateHistoryBlock(message, new Date());
                    that.controller.addHistory(message, new Date());

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

            //***************************************************************************************** history
            var message = "You changed raing of book <b>#" + card.getAttribute("id") + "</b> to <b>" + rating + "</b> stars";
            that.updateHistoryBlock(message, new Date());
            that.controller.addHistory(message, new Date());
        }

        if (target.classList.contains("card__image")) {
            var card = target.parentElement;
            that.book = that.model.getBookById(card.getAttribute("id"));
            that.showModal("Book Editing", that.book);

            //***************************************************************************************** history
            var message = "You desided to edit book <b>#" + that.book.id + "</b>: <b>" + that.book.title + "</b> by <b>" + that.book.author + "</b>";
            that.updateHistoryBlock(message, new Date());
            that.controller.addHistory(message, new Date());
        }
    });

    this.modalOkElement.addEventListener("click", function () {
        that.book.title = that.modalTitleInputElement.value;
        that.book.author = that.modalAuthorInputElement.value;
        that.book.image = that.modalCoverInputElement.value;
        var tagBages = that.modalTagSetElement.getElementsByClassName("modal__tag");
        that.book.tags = [];
        for (var i = 0; i < tagBages.length; i++) {
            var tag = tagBages[i].getElementsByClassName("modal__tag-name")[0].innerHTML;
            that.book.tags.push(tag);
        }

        if (that.book.id > 0) {
            that.controller.updateBook(that.book);
            //***************************************************************************************** history
            var message = "You updated book <b>#" + that.book.id + "</b> as <b>" + that.book.title + "</b>, <b>" + that.book.author + "</b>, <b>" + that.book.image + "</b>, <b>" + that.book.tags.toString() + "</b>";
            that.updateHistoryBlock(message, new Date());
            that.controller.addHistory(message, new Date());
        } else {
            that.book.id = that.model.getId();
            that.controller.addBook(that.book);
            //***************************************************************************************** history
            var message = "You added book <b>#" + that.book.id + "</b> as <b>" + that.book.title + "</b>, <b>" + that.book.author + "</b>, <b>" + that.book.image + "</b>, <b>" + that.book.tags.toString() + "</b>";
            that.updateHistoryBlock(message, new Date());
            that.controller.addHistory(message, new Date());
        }

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

                //delete label "No tags yet"
                var label = that.modalTagSetElement.getElementsByClassName("modal__label")[0];
                if (label) {
                    that.modalTagSetElement.removeChild(label);
                }

                that.closeSelect();
            }
        }
    });

    this.modalElement.addEventListener("click", function () {
        event.stopPropagation();
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

            //delete label "No tags yet"
            var label = that.modalTagSetElement.getElementsByClassName("modal__label")[0];
            if (label) {
                that.modalTagSetElement.removeChild(label);
            }
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

            //if no tags add label "No tags yet"
            if (that.modalTagSetElement.children.length == 0) {
                var message = document.createElement("label");
                message.classList.add("modal__label");
                message.innerHTML = "No tags yet";
                that.modalTagSetElement.appendChild(message);
            }
        }
    });

    this.addItemElement.addEventListener("click", function () {
        //this sh!t is very important
        that.book = {
            id: undefined,
            title: undefined,
            author: undefined,
            image: undefined,
            rating: undefined,
            tags: []
        };
        that.showModal("New Book");

        //***************************************************************************************** history
        var message = "You desided to add new book";
        that.updateHistoryBlock(message, new Date());
        that.controller.addHistory(message, new Date());
    });

    this.fadeElement.addEventListener("click", function () {
        var target = event.target;
        if (that.modalElement.style.visibility = "visible") {
            if (that.modalTagSelectElement.style.visibility = "visible") {
                that.closeSelect();
            }
            that.closeModal();
        }
    });

    this.mainNavElement.addEventListener("click", function () {
        event.preventDefault();
        var target = event.target;
        if (target.parentElement.classList.contains("nav__item")) {
            var activePage = that.mainNavElement.getElementsByClassName("nav__item--active")[0];
            activePage.classList.remove("nav__item--active");
            target.parentElement.classList.add("nav__item--active");

            var pageNo = target.parentElement.getSiblingsNo();
            switch (pageNo) {
                case 1:
                    that.showLibrary(that.model.getLibrary());
                    break;
                case 2:
                    that.showLibrary(that.model.getLibrary());
                    break;
                case 3:
                    that.showLibrary(that.model.getLibrary());
                    break;
                case 4:
                    that.showLibrary(that.model.getLibrary());
                    break;
                case 5:
                    that.showLibrary(that.model.getLibrary());
                    break;
                case 6:
                    that.showAllHistory();
                    break;
            }
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
    this.libraryElement.style.display = "flex";
    this.libraryElement.style.flexWrap = "wrap";

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

    if (arguments.length > 1) {
        this.modalTitleInputElement.value = book.title;
        this.modalAuthorInputElement.value = book.author;
        this.modalCoverInputElement.value = book.image;

        var bookTags = this.model.getBookById(book.id).tags;
        this.updateTagSet(bookTags);

        var allTags = this.model.getAllTags();
        this.updateTagSelect(allTags, bookTags);
    } else {
        this.modalTitleInputElement.value = "";
        this.modalAuthorInputElement.value = "";
        this.modalCoverInputElement.value = "";

        this.updateTagSet([]);

        var allTags = this.model.getAllTags();
        this.updateTagSelect(allTags, []);
    }
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

//system messages
View.prototype.updateHistoryBlock = function (message, time) {
    var item = document.createElement("li");
    item.classList.add("history-block__item");

    var iconWrap = document.createElement("div");
    iconWrap.classList.add("history-block__icon");
    var icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-clock-o");
    icon.setAttribute("aria-hidden", "true");

    var content = document.createElement("div");
    content.classList.add("history-block__content");

    var eventEl = document.createElement("div");
    eventEl.classList.add("history-block__event");
    eventEl.innerHTML = message;
    var timeEl = document.createElement("div");
    timeEl.classList.add("history-block__time");
    timeEl.innerHTML = "0 minutes ago";

    iconWrap.appendChild(icon);
    content.appendChild(eventEl);
    content.appendChild(timeEl);
    item.appendChild(iconWrap);
    item.appendChild(content);

    item.setAttribute("since", time.getTime());

    this.historyBlockElement.insertBefore(item, this.historyBlockElement.firstElementChild);
    if (this.historyBlockElement.children.length > this.model.HISTORY_BLOCK_LENGTH) {
        this.historyBlockElement.removeChild(this.historyBlockElement.lastElementChild);
    }

    item.style.visibility = "visible";
    item.style.maxHeight = "500px";
}

View.prototype.showAllHistory = function () {
    this.libraryElement.removeAllChildren();
    this.libraryElement.style.display = "block";
    this.libraryElement.style.flexWrap = null;

    var hist = this.model.getAllHistory();
    for (var i = 0; i < hist.length; i++) {
        var item = document.createElement("div");
        item.classList.add("history-page__item");

        var timeEl = document.createElement("div");
        timeEl.classList.add("history-page__time");
        timeEl.innerHTML = hist[i].time.toLocaleString("en-GB");

        var eventEl = document.createElement("div");
        eventEl.classList.add("history-page__event");
        eventEl.innerHTML = hist[i].message;

        item.appendChild(timeEl);
        item.appendChild(eventEl);

        this.libraryElement.insertBefore(item, this.libraryElement.firstElementChild);
    }
}

View.prototype.updateHistoryTimers = function () {
    var items = this.historyBlockElement.children;
    for (var i = 0; i < items.length; i++) {
        var createTime = items[i].getAttribute("since");
        var currentTime = new Date().getTime();
        var agoTime = Math.floor(Math.floor((currentTime - createTime) / 1000) / 60);
        var histTime = items[i].getElementsByClassName("history-block__content")[0].getElementsByClassName("history-block__time")[0];
        histTime.innerHTML = agoTime + " minutes ago";
    }
}
