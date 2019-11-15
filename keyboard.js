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
        // var elemLength = elem.length;
        var type = 0;
        var count = 0;
        gridContents.push("<tr>");
        for (c in elem) {
            count++;
            type = elem[c];
            if (elem[c]===elem[c-1]) {
                console.log("a", conf, type, count);
            }
            else {
                //count = 1;
                console.log("b", conf, type, count);
            }
            if (c==elem.length-1) {
                if (elem[c]==="-") {
                    if (count==1) {
                        gridContents.push("<td></td>");
                    }
                    else if (count>1) {
                        var dSpan = "<td colspan=\"" + count + "\"></td>";
                        gridContents.push(dSpan);
                    }
                }
                if (elem[c]==="*") {
                    if (count==1) {
                        gridContents.push("<td></td>");
                    }
                    else if (count>1) {
                        for (var c=count; c>0; c--) {
                            gridContents.push("<td></td>");
                        }
                   }
                }
            }
            if (elem[c]!==elem[c-1] && c>0 && c<elem.length-1) {
                count--;
                if (elem[c-1]==="-") {
                    if (count==1) {
                        gridContents.push("<td></td>");
                    }
                    else if (count>1) {
                        var dSpan = "<td colspan=\"" + count + "\"></td>";
                        gridContents.push(dSpan);
                    }
                }
                if (elem[c-1]==="*") {
                    if (count==1) {
                        gridContents.push("<td></td>");
                    }
                    else if (count>1) {
                        for (var c=count; c>0; c--) {
                            gridContents.push("<td></td>");
                        }
                    }
                }
                count = 1;
            }
        }
        gridContents.push("</tr>");
    }
//        if (elemLength==0) {
//            gridContents.push("<tr></tr>");
//        }
//        else {
//            gridContents.push("<tr>");
//            var numCells = 0;
//            var cellType = "";
//            var prev = "";
//            for (c in elem) {
//                if (prev==="") {
//                    cellType = elem[c];
//                    numCells++;
//                    console.log(c, cellType, numCells, prev);
//                }
//                if (elem[c]===prev) {
//                    numCells++;
//                }
//                if (c==elemLength-1) {
//                    if (elem[c]!==prev) {
//                        numCells = 1;
//                        cellType = elem[c];
//                        if (cellType==="-" || cellType==="*") {
//                            gridContents.push("<td></td>");
//                        }
//                    }
//                    else {
//                        if (prev==="*") {
//                            for (var c=numCells; c>0; c--) {
//                                gridContents.push("<td></td>");
//                            }
//                        }
//                        if (prev==="-") {
//                            var dSpan = "<td colspan=\"" + numCells + "\"></td>";
//                            gridContents.push(dSpan);
//                        }
//                    }
//                }
//                else if (c<elemLength-1) {
//                }
//
//                prev = elem[c];
//
//            }
//
//                gridContents.push("</tr>");
//
//        }
//    }

    return "<table>" + gridContents.join("") + "</table>";

}
