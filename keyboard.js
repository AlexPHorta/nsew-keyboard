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
        if (elem.length==0) {
            gridContents.push("<tr></tr>");
        }
        else {
            gridContents.push("<tr>");
            var cSpan = 0;
            var cellNum = 0;
            for (c in elem) {
                if (elem[c]=="-") {
                    cSpan++;
                }
                cellNum++;
            }
            if (cSpan>1) {
                var row = "<td colspan=\"" + cSpan + "\"></td>";
            }
            else {
                for (var c = cellNum;c>0;c--) {
                    gridContents.push("<td></td>");
                }
            }

            gridContents.push(row);

            gridContents.push("</tr>");

        }
    }

    return "<table>" + gridContents.join("") + "</table>";

}
