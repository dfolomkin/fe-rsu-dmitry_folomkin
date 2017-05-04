function Shape(name, type) {
    this.name = name;
    this.type = type;
}

Shape.prototype.getType = function () {
    return console.log(this.type);
};

Shape.prototype.getPerimetr = function () {
    return;
};

Shape.prototype.drawn = function () {
    console.log(this.name + " is drawn");
};

function Triangle(name, a, b, c) {
    Shape.call(this, name, "triangle");
    this.a = a;
    this.b = b;
    this.c = c;
}

Triangle.prototype = Shape.prototype;

Triangle.prototype.getPerimetr = function () {
    return console.log(this.a + this.b + this.c);
};

var tri_1 = new Triangle("triangle1", 2, 3, 6);
tri_1.getType();
tri_1.getPerimetr();
tri_1.drawn();
console.log();

function Square(name, a) {
    Shape.call(this, name, "square");
    this.a = a;
}

Square.prototype = Shape.prototype;

Square.prototype.getPerimetr = function () {
    return console.log(this.a * 4);
};

var sqr_2 = new Square("square2", 5);
sqr_2.getType();
sqr_2.getPerimetr();
sqr_2.drawn();
console.log();

function RoundSquare(name, a, rad) {
    Square.call(this, name, a);
    this.rad = rad;
}

RoundSquare.prototype = Square.prototype;

RoundSquare.prototype.getPerimetr = function () {
    return console.log(2 * 3.14 * this.rad + (this.a - 2 * this.rad) * 4);
};

RoundSquare.prototype.isRound = function () {
    return console.log(this.rad * 2 == this.a);
};

var rsqr_3 = new RoundSquare("roundSquare3", 6, 1);
rsqr_3.getType();
rsqr_3.getPerimetr();
rsqr_3.isRound();
rsqr_3.drawn();
console.log();