function Model() {
    this.STAR_NUMBER = 5;
    this.HISTORY_BLOCK_LENGTH = 10;

    this.library = [];
    this.onGetLibrary = new EventEmitter();
    this.onSearchInput = new EventEmitter();
    this.onRatingFilter = new EventEmitter();
    this.onRatingSet = new EventEmitter();
    this.onBookUpdate = new EventEmitter();
    this.onBookAdd = new EventEmitter();

    this.allTags = [];
    this.allHistory = [];
}

Model.prototype.init = function () {
    this.allTags = ["Best of List", "Classic Novels", "Non Fiction", "Must Read Titles"];

    this.allHistory = [
        {
            time: new Date(),
            message: "initialization"
        }
    ];
}

Model.prototype.setLibrary = function (lib) {
    this.library = lib;
}

Model.prototype.getLibrary = function() {
    var that = this;
    
    fetch("getLibrary", {
        method: "GET"
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (obj) {
        that.setLibrary(obj);
        that.onGetLibrary.notify(that.library);
    });
}

Model.prototype.getAllTags = function () {
    return this.allTags;
}

Model.prototype.filterByText = function (str) {
    var result = [];
    for (var i = 0; i < this.library.length; i++) {
        var lowStr = str.toLowerCase();
        var lowTitle = this.library[i].title.toLowerCase();
        var lowAuthor = this.library[i].author.toLowerCase();
        if (~lowTitle.indexOf(lowStr) || ~lowAuthor.indexOf(lowStr)) {
            result.push(this.library[i]);
        }
    }
    this.onSearchInput.notify(result);
}

Model.prototype.filterByRating = function (int) {
    var result = [];
    for (var i = 0; i < this.library.length; i++) {
        if (this.library[i].rating == int) {
            result.push(this.library[i]);
        }
    }
    this.onRatingFilter.notify(result);
}

Model.prototype.getBookById = function (int) {
    var i = 0;
    while (this.library[i].id != int) {
        i++;
    }
    return this.library[i] || false;
}

Model.prototype.setRatingById = function (id, rating) {
    var book = this.getBookById(id);
    if (book) {
        book.rating = rating;
        this.onRatingSet.notify(book);
    }
}

Model.prototype.updateBook = function (viewBook) {
    var modelBook = this.getBookById(viewBook.id);
    if (modelBook) {
        modelBook = viewBook;

        //add new tags into allTag array
        var bookTags = viewBook.tags;
        var allTagsStr = this.allTags.join(", ");
        for (var i = 0; i < bookTags.length; i++) {
            if (!~allTagsStr.indexOf(bookTags[i])) {
                this.allTags.push(bookTags[i]);
            }
        }

        this.onBookUpdate.notify(modelBook);
    }
}

Model.prototype.getId = function () {
    var newId = 1;
    for (var i = 0; i < this.library.length; i++) {
        if (this.library[i].id > newId) {
            newId = this.library[i].id;
        }
    }
    newId++;
    return newId;
}

Model.prototype.addBook = function (book) {
    this.library.push(book);

    var that = this;
    
    fetch("addBook", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(this.library, "", 4)
    })
    .then(function (res) {
        if (res.json()) {}
        that.onBookAdd.notify(that.library);
    });
}

Model.prototype.addHistory = function (message, time) {
    var record = {
        time: time,
        message: message
    }
    this.allHistory.push(record);
}

Model.prototype.getAllHistory = function () {
    return this.allHistory;
}