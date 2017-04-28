"use strict";

document.getElementById("button1").addEventListener("click", function() { prepend("#target","#source") });

function prepend(targetSelector, sourceSelector) {
    var sourceElement = document.querySelector(sourceSelector);
    var targetElement = document.querySelector(targetSelector);
    var prevFirstChild = targetElement.querySelector("*");

    if (prevFirstChild != null) {
        targetElement.insertBefore(sourceElement, prevFirstChild);
    } else {
        targetElement.appendChild(sourceElement);
    }
}

