function prepend(targetSelector, sourceSelector) {
    "use strict";
    var sourceElement = document.querySelector(sourceSelector);
    var targetElement = document.querySelector(targetSelector);
    var prevFirstChild = targetElement.querySelector("*");

    if (prevFirstChild !== null) {
        targetElement.insertBefore(sourceElement, prevFirstChild);
    } else {
        targetElement.appendChild(sourceElement);
    }
}

if (typeof document !== "undefined") {
    document.getElementById("button1").addEventListener("click", function () {
        prepend("#target", "#source");
    });
}