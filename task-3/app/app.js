function Aplication() { }

Aplication.prototype.start = function () {
    var fridge = new Fridge("Breeze", 800, true, true, 2100);
    var microwave = new Microwave("Crispy", 650, false, true);
    var teapot = new Teapot("Chiny", 200, false, false);
    var kitchenLamp = new Lamp("Sunny", 80);
    var kitchenTV = new TV("LG S5000", 150, "32 inch Full HD", "Doulby Digital 25W Stereo System");

    var kitchen = new Room("Kitchen", [fridge, microwave, teapot, kitchenLamp]);

    var washer = new Washer("Washy", 550, "Level A insulation");
    var hairdryer = new Hairdryer("Curly", 100, "Yes, but it's not exact");

    var bath = new Room("Bathroom", [washer, hairdryer, teapot]);

    var lroomTV = new TV("Samsung S-Billion Soopa", 200, "60 inch 4K", "Doulby Digital 50W Super Mega Neighbourhood's Death System");
    var note = new Notebook("MSI CX-70", 150, "19 inch IPS Full HD", "Noname System", "Windows 8.1");
    var lroomLamp1 = new Lamp("Room Lamp 1", 100);
    var lroomLamp2 = new Lamp("Room Lamp 2", 100);

    var livingroom = new Room("Living room", [lroomTV, note, lroomLamp1, lroomLamp2]);

    var myApartment = new Apartment([kitchen, bath, livingroom]);

    fridge.enable();
    teapot.enable();
    kitchenLamp.enable();
    kitchenTV.enable();
    kitchenTV.setTimer(5000);
    kitchenTV.timeoutDisable();

    console.log("Total power in " + kitchen.getName() + ": " + kitchen.getPower());
    console.log("Curent power in " + kitchen.getName() + ": " + kitchen.getPower(true));

    washer.enable();

    console.log("Total power in " + bath.getName() + ": " + bath.getPower());
    console.log("Curent power in " + bath.getName() + ": " + bath.getPower(true));

    lroomTV.enable();
    note.enable();
    lroomLamp1.enable();
    lroomLamp2.enable();

    console.log("Total power in " + livingroom.getName() + ": " + livingroom.getPower());
    var func = function () {
        console.log("Curent power in " + livingroom.getName() + ": " + livingroom.getPower(true));
    }
    func();
    setTimeout(func, 6000);

    myApartment.findDevice("Chiny");
}