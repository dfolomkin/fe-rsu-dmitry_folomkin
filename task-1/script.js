"use strict";

var prepend = function(targetSelector, sourceSelector) {
    var sourceElement = document.querySelector(sourceSelector);
    var targetElement = document.querySelector(targetSelector);

    targetElement.appendChild(sourceElement);
    document.removeChild(sourceElement);
}

var button = document.getElementById("relocate");
button.addEventListener("click", prepend("#target", "#source"));