function Model() {
    this.library = null;
    this.onSearchInput = new EventEmitter();
    this.onRatingSet = new EventEmitter();
}

Model.prototype.init = function () {
    this.library = [
        {
            title: "Jewels of Nizam",
            author: "Geeta Devi",
            image: "library_03.png",
            rating: 5,
            tags: []
        },
        {
            title: "Cakes & Bakes",
            author: "Sanjeev Kapoor",
            image: "library_05.png",
            rating: 5,
            tags: []
        },
        {
            title: "Jamie's Kithen",
            author: "Jamie Oliver",
            image: "library_07.png",
            rating: 4,
            tags: []
        },
        {
            title: "Inexpensive Family Meals",
            author: "Simon Holst",
            image: "library_09.png",
            rating: 4,
            tags: []
        },
        {
            title: "Paleo Slow Cooking",
            author: "Chrissy Gower",
            image: "library_11.png",
            rating: 4,
            tags: []
        },
        {
            title: "Cook Like an Italian",
            author: "Tobie Puttock",
            image: "library_19.png",
            rating: 4,
            tags: []
        },
        {
            title: "Let's Cook!",
            author: "Heisenberg",
            image: "library_99.png",
            rating: 5,
            tags: []
        },
        {
            title: "Jamie Does",
            author: "Jamie Oliver",
            image: "library_22.png",
            rating: 4,
            tags: []
        },
        {
            title: "Jamie's Italy",
            author: "Jamie Oliver",
            image: "library_23.png",
            rating: 5,
            tags: []
        },
        {
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
        if (library[i].rating == int) {
            result.push(library[i]);
        }
    }
    return result;
}

Model.prototype.getBookByName = function (str) {
    for (var i = 0; i < this.library.length; i++) {
        if (this.library[i].title == str) {
            return this.library[i];
        }
    }
    return false;
    // var i = 0;
    // while (library[i].title != str) {
    //     i++;
    // }
    // return library[i] || false;
}

Model.prototype.getRating = function (book) {
    return book.rating;
}

Model.prototype.setBookRating = function (str, int) {
    if (this.getBookByName(str)) {
        this.getBookByName(str).rating = int;
    }    
}