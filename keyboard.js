function genKbdKeys(conf) {
    let kbdKeys = conf.toString();
    kbdKeys = kbdKeys.replace(/-|_|\*|,/g,"");
    kbdKeys = kbdKeys.sort();
    console.log(kbdKeys);
}

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
    console.log("confIsArray ", confIsArray);
    var gridContents = [];
    let tbl = document.createElement('table');

    if (!confIsArray) {
        throw new Error("Feed me an Array!");
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
        for (var c in line) {
            if (line[c] === "*" || (line[c] !== line[c-1] && line[c] !== "_")) {
                var ob = new Cell(line[c], 1);
                objs.push(ob);
            } else { 
                objs[objs.length-1].incr();
            }
        }
        return objs;
    }

    for (var ln in conf) {
        let tr = document.createElement('tr');
        var lin = mkCells(conf[ln]);
        for (var ob in lin) {
            var keyId = kbdKeys.indexOf(lin[ob].elem);
            var celSp = lin[ob].quant;
            let td = document.createElement('td');
            if (keyId >= 0) {
                td.id = keyId;
                td.className = 'key';
            }
            if (celSp > 1) {
                td.colSpan = celSp;
            }
            tr.appendChild(td);
        }
        tbl.appendChild(tr);
    }
    return tbl.outerHTML.toString();
}
