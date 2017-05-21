function Aplication() {}

Aplication.prototype.start = function() {
    var choop = new Candy("Choop", 25, 0.5);
    var barbaris = new Candy("RedCandy", 10, 0.8);
    var alenka = new Chocolate("Alenka Chocolate", 100, 45);
    var snikers = new Chocolate("Snikers", 65, 55);
    var oreo = new Cookie("Oreo", 200);
    var sweet1 = new Sweet("Something else", 100);

    // console.log(choop.getName());
    // console.log(choop.getWeight());
    // console.log(choop.isTransparent());
    // console.log(alenka.getName());
    // console.log(alenka.getWeight());
    // console.log(alenka.getChocoType());
    // console.log(oreo.getName());
    // console.log(oreo.getWeight());
    // console.log(sweet1.getName());
    // console.log(sweet1.getWeight());

    var gift1 = new Gift([choop, barbaris, alenka, snikers, oreo, sweet1]);

    console.log(gift1.getWeight());
    console.log(gift1.countWeight());
    console.log(gift1.getWeight());

    console.log(gift1.getContent());
    console.log(gift1.sort("byName"));
    console.log(gift1.getContent());

    var gift2 = new Gift([choop, barbaris, alenka, snikers, oreo, sweet1]);

    console.log(gift2.sort("byWeight"));
    console.log(gift2.getContent());

    console.log(gift2.find("RedCandy"));
}