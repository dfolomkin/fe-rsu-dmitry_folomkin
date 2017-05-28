;(function () {
    selectors = document.getElementsByClassName("modal__select");
    for (var i = 0; i < selectors.length; i++) {
        var selectpicker = selectors[i];
        selectpicker.addEventListener("click", function (event) {
            event.preventDefault();
        });
        selectpicker.addEventListener("focus", function (event) {
            event.preventDefault();
        });
    }
}());