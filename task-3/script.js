; (function () {
    if (typeof document !== "undefined") {
        var accordions = document.querySelectorAll(".accordion");
    }

    //set initial state
    for (var i = 0; i < accordions.length; i++) {
        var accordionItems = accordions[i].children;
        for (var j = 1; j < accordionItems.length; j++) {
            var itemBody = accordionItems[j].querySelector(".accordion__item-body");
            var shevron = accordionItems[j].querySelector(".accordion__item-header").querySelector(".fa-chevron-up");
            itemBody.classList.add("accordion__item-body--collapsed");
            shevron.classList.add("fa-chevron-up--down");
        }
    }

    //change collapse state
    function changeCollapse(item) {
        var itemBody = item.querySelector(".accordion__item-body");
        var shevron = item.querySelector(".accordion__item-header").querySelector(".fa-chevron-up");
        if (itemBody.classList.contains("accordion__item-body--collapsed")) {
            itemBody.classList.remove("accordion__item-body--collapsed");
            shevron.classList.remove("fa-chevron-up--down");
        } else {
            itemBody.classList.add("accordion__item-body--collapsed");
            shevron.classList.add("fa-chevron-up--down");
        }
    }

    for (var i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener("click", function (event) {
            var target = event.target;
            while (!target.classList.contains("accordion__item-header")) {
                target = target.parentElement;
            }
            //target = itemHeader
            //target.parentElement = accordionItem
            
            if (target.classList.contains("accordion__item-header")) {
                //collapse prev item if not multiblock
                if (!target.parentElement.parentElement.classList.contains("accordion--multiblock")) {
                    var accordionItems = target.parentElement.parentElement.children;
                    for (var j = 0; j < accordionItems.length; j++) {
                        var itemBody = accordionItems[j].querySelector(".accordion__item-body");
                        if (!itemBody.classList.contains("accordion__item-body--collapsed")) {
                            changeCollapse(accordionItems[j]);
                            break;
                        }                        
                    }
                }
                //uncollapse event target
                changeCollapse(target.parentElement);
            }
        });
    }
} ());