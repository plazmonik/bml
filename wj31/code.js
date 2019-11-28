function show_hide(button, replyDivId) {
    var replyDiv = document.getElementById(replyDivId);
    var style = replyDiv.getAttribute("style");
    if (style == "display:none") {
        replyDiv.setAttribute("style", "display:block");
        button.setAttribute("class", "button opened");
    } else {
        replyDiv.setAttribute("style", "display:none");
        button.setAttribute("class", "button closed");
    }
}

function formatColor(label) {
    if (label == "P ") {
        return '<span class="pcolor">PASS</span>';
    } else if (label == "X ") {
        return "X";
    } else if (label == "XX") {
        return "XX";
    } else if (label == "..") {
        return label;
    } else {
        return label.substring(0, 1) + toBridgeColor(label.substring(1, 2));
    }
}

function toBridgeColor(label) {
    switch (label) {
        case "C":
            return '<span class="ccolor">♣</span>';
        case "D":
            return '<span class="dcolor">♦</span>';
        case "H":
            return '<span class="hcolor">♥</span>';
        case "S":
            return '<span class="scolor">♠</span>';
        default:
            return "NT";
    }
}

function getColorValue(label) {
    switch (label) {
            case "C":
                return 0;
            case "D":
                return 1;
            case "H":
                return 2;
            case "S":
                return 3;
            case "N":
                return 4;
            default:
                return 5;
        }
}

function buildElements(parent, json, currentPath) {
    if ((currentPath.length / 2) % 2 == 0) {
        parent.setAttribute("class", parent.getAttribute("class") + " backgroundOdd");
    } else {
        parent.setAttribute("class", parent.getAttribute("class") + " backgroundEven");
    }
    var keys = Object.keys(json);
    keys.sort(function(a, b) {
        if (a == "..") {
            return 1;
        }
        if (b == "..") {
            return -1;
        }
        if (a == "P ") {
            return -1;
        }
        if (b == "P ") {
            return 1;
        }
        if (a.substring(0, 1) == b.substring(0, 1)) {
            return getColorValue(a.substring(1, 2)) - getColorValue(b.substring(1, 2));
        } else {
            return a.substring(0, 1) - b.substring(0, 1);
        }
        return 0;
    });
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var data = json[key];
        var mainTable = document.createElement("table");
        var mainRow = document.createElement("tr");
        var keyElem = document.createElement("td");
        var descriptionElem = document.createElement("td");
        var tableDescription = document.createElement("table");
        descriptionElem.appendChild(tableDescription);
        mainRow.appendChild(keyElem);
        mainRow.appendChild(descriptionElem);
        mainTable.appendChild(mainRow);
        var divButton = document.createElement("div");
        divButton.setAttribute("class", "button");
        divButton.innerHTML = formatColor(key);
        keyElem.appendChild(divButton);
        parent.appendChild(mainTable);

        if ("description" in data) {
            var description = data["description"];
            for (var j = 0; j < description.length; j++) {
                var text = description[j];
                var tr = document.createElement("tr");
                var descriptionData = document.createElement("td");
                tr.appendChild(descriptionData);
                text = text.replace("!s", toBridgeColor("S"));
                text = text.replace("!h", toBridgeColor("H"));
                text = text.replace("!d", toBridgeColor("D"));
                text = text.replace("!c", toBridgeColor("c"));
                text = text.replace("!n", toBridgeColor("N"));
                descriptionData.innerHTML = text;
                tableDescription.appendChild(tr);
            }
        }

        if ("answers" in data) {
            var div = document.createElement("div");
            var newPath = currentPath + key;
            div.setAttribute("id", newPath);
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            div.setAttribute("style", "display:none");
            div.setAttribute("class", "answer");
            td.appendChild(div);
            tr.appendChild(document.createElement("td"));
            tr.appendChild(td);
            mainTable.appendChild(tr);
            divButton.setAttribute("onclick", "show_hide(this, \"" + newPath + "\")");
            divButton.setAttribute("class", "button closed");
            buildElements(div, data.answers, newPath);
        }
    }
}
