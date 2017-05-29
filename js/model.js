function Model() {
    this.STAR_NUMBER = 5;
    
    this.library = null;
    this.onSearchInput = new EventEmitter();
    this.onRatingFilter = new EventEmitter();
    this.onRatingSet = new EventEmitter();
    this.onBookUpdate = new EventEmitter();

    this.allTags = ["Best of List", "Classic Novels", "Non Fiction", "Must Read Titles"];    
}

Model.prototype.init = function () {
    this.library = [
        {
            id: 1,
            title: "Jewels of Nizam",
            author: "Geeta Devi",
            image: "library_03.png",
            rating: 5,
            tags: ["Best of List", "Classic Novels"]
        },
        {
            id: 2,
            title: "Cakes & Bakes",
            author: "Sanjeev Kapoor",
            image: "library_05.png",
            rating: 5,
            tags: ["Best of List"]
        },
        {
            id: 3,
            title: "Jamie's Kithen",
            author: "Jamie Oliver",
            image: "library_07.png",
            rating: 4,
            tags: ["Non Fiction"]
        },
        {
            id: 4,
            title: "Inexpensive Family Meals",
            author: "Simon Holst",
            image: "library_09.png",
            rating: 4,
            tags: []
        },
        {
            id: 5,
            title: "Paleo Slow Cooking",
            author: "Chrissy Gower",
            image: "library_11.png",
            rating: 4,
            tags: []
        },
        {

            id: 6,
            title: "Cook Like an Italian",
            author: "Tobie Puttock",
            image: "library_19.png",
            rating: 4,
            tags: []
        },
        {
            id: 11,
            title: "Let's Cook!",
            author: "Heisenberg",
            image: "library_99.png",
            rating: 5,
            tags: ["Best of List", "Classic Novels", "Non Fiction", "Must Read Titles"]
        },
        {
            id: 8,
            title: "Jamie Does",
            author: "Jamie Oliver",
            image: "library_22.png",
            rating: 4,
            tags: []
        },
        {
            id: 9,
            title: "Jamie's Italy",
            author: "Jamie Oliver",
            image: "library_23.png",
            rating: 5,
            tags: []
        },
        {
            id: 10,
            title: "Vegetables Cookbook",
            author: "Matthew Biggs",
            image: "library_24.png",
            rating: 3,
            tags: []
        }
    ];
}

Model.prototype.getLibrary = function () {
    return this.library;
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

Model.prototype.getAllTags = function () {
    return this.allTags;
}