function makeGrid(conf, keyss="") {
    // Make the table that will serve as the keyboard's structure from an array
    // of characters that indicate the layout, e.g.:
    //
    // "-----8-----" --> <td colspan="5"></td><td id="8" class="key></td><td colspan="5"></td>
    // "-----4t_---" --> <td colspan="5"></td><td id="4" class="key colspan="2"></td><td colspan="3"></td>
    //
    // Hopefully this will make it easier to rearrange the keyboard's layout
    // simply modifying the configuration array.


    var kbdKeys = keyss;
    var confIsArray = conf instanceof Array;
    var gridContents = [];

    if (!confIsArray) {
        throw new Error('Error');
    }

    function Cell (elem, quant) {
        this.elem = elem;
        this.quant = quant;
        this.incr = function () {
            this.quant++;
        };
    }

    function mkCells (line) {
        var objs = [];
        for (c in line) {
            if (line[c] === "*" || (line[c] !== line[c-1] && line[c] !== "_")) {
                var ob = new Cell(line[c], 1);
                objs.push(ob);
            }
            else { 
                objs[objs.length-1].incr();
            }
        }
        console.log(objs);
        return objs;
    }

    for (ln in conf) {
        gridContents.push('<tr>');
        var lin = mkCells(conf[ln]);
        for (ob in lin) {
            var keyId = kbdKeys.indexOf(lin[ob].elem);
            var celSp = lin[ob].quant;
            if (keyId >= 0) {
                if (celSp === 1) {
                    gridContents.push('<td id="' + keyId + '" class="key"></td>');
                }
                else {
                    gridContents.push('<td id="' + keyId + '" class="key" colspan="' + celSp + '"></td>');
                }
            }
            else{
                if (celSp === 1) {
                    gridContents.push('<td></td>');
                }
                else {
                    gridContents.push('<td colspan="' + celSp + '"></td>');
                }
            }
        }
        gridContents.push('</tr>');
    }
    return '<table>' + gridContents.join("") + '</table>';
}
