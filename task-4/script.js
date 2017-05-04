//cookie exist emulation
document.cookie = "userName=Jhon; expires=01/01/2018 00:00:00";
document.cookie = "userPass=Doe; expires=01/01/2018 00:00:00";
document.cookie = "userRole=user; expires=01/01/2018 00:00:00";

//module
; (function () {
    "use strict";

    //prepare table
    var arr = ["Cookie Name", "Cookie Value", "Control"];
    var table = document.createElement("table");
    var row = document.createElement("tr");
    document.body.appendChild(table);
    table.appendChild(row);
    for (var i = 0; i < 3; i++) {
        var col = document.createElement("th");
        col.innerHTML = arr[i];
        row.appendChild(col);
    }

    function getName(str) {
        var str2 = str.substring(0, str.indexOf("=", 0));
        return str2;
    }

    function getValue(str) {
        var str2 = str.substring(str.indexOf("=", 0) + 1, str.length);
        return str2;
    }

    //write cookie into rows
    function refreshTable() {
        var cookies = document.cookie.split("; ");
        if (cookies[0] === "") {
            cookies = [];
        }

        while (table.children.length > 1) {
            table.removeChild(table.lastElementChild);
        }

        for (var i = 0; i < cookies.length; i++) {
            var arr = [getName(cookies[i]), getValue(cookies[i]), "<button>Удалить</button>"];
            var row = document.createElement("tr");
            table.appendChild(row);
            for (var j = 0; j < 3; j++) {
                var col = document.createElement("td");
                col.innerHTML = arr[j];
                row.appendChild(col);
            }
        }
    }
    refreshTable();

    //setCookie from https://learn.javascript.ru
    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    //deleteCookie from https://learn.javascript.ru
    function deleteCookie(name) {
        setCookie(name, "", {
            expires: -1
        });
    }

    //delete target cookie
    function deleteTargetCookie(target) {
        var name = target.parentElement.previousElementSibling.previousElementSibling.innerHTML;
        deleteCookie(name);
        refreshTable();
    }

    //add listener
    table.addEventListener("click", function (event) {
        if (event.target.tagName == "BUTTON") {
            deleteTargetCookie(event.target);
        }
    });
}());