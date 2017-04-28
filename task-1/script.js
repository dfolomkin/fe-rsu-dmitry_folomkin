

var prepend = function(targetSelector, sourceSelector) {
    var sourceElement = document.querySelector(sourceSelector);
    var targetElement = document.querySelector(targetSelector);

    targetElement.appendChild(sourceElement);
    document.removeChild(sourceElement);
}

var button1 = document.getElementById("button1");
button1.onclick = function() {prepend("#target","#source")};