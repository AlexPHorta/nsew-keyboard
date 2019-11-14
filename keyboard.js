function makeGrid(conf) {
    var confIsArray = conf instanceof Array;
    var cell = {
        colspan: 0,
        id: null,
        _class: null
    };
    var gridContents = [];

    if (!confIsArray) {
        throw new Error('Error');
    }

    for (el in conf) {
        var elem = conf[el];
        var elemLength = elem.length;
        if (elemLength==0) {
            gridContents.push("<tr></tr>");
        }
        else {
            gridContents.push("<tr>");
            var numCells = 0;
            var cellType = "";
            var prev = "";
            for (c in elem) {
                if (prev==="") {
                    cellType = elem[c];
                    numCells++;
                    prev = elem[c];
                }
                else if (elem[c]===prev) {
                    numCells++;
                }
                else if (c<elemLength-1 && elem[c]!==prev) {
                    if (prev==="*") {
                        for (var c=numCells; c>0; c--) {
                            gridContents.push("<td></td>");
                        }
                    }
                    else if (prev==="-") {
                        var dSpan = "<td colspan=\"" + numCells + "\"></td>";
                        gridContents.push(dSpan);
                    }
                else if (c==elemLength-1 && elem[c]!==prev) {
                   // TODO: resolver como fica o último elemento da linha!!! 
                    numCells = 1;
                    cellType = elem[c];
                }
            }

            gridContents.push("</tr>");

        }
    }

    return "<table>" + gridContents.join("") + "</table>";

}
