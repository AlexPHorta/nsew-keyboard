function genCursorWalkPaths(conf) {
    let paths = [];
    let keys = genKbdKeys(conf);
    let numKeys = keys.length;

    for (let i=0; i<conf.length-1; i++) {
        if (keys.search(conf[i][0]) >= 0) {
        }
    }
}

function genKbdKeys(conf) {
    // Generate the string that will determine the id's of the keys.
    
    let kbdKeys = conf.toString();
    kbdKeys = kbdKeys.replace(/-|_|\*|,/g,"");
    kbdKeys = kbdKeys.split('').sort().join('');
    console.log(kbdKeys);
    return kbdKeys;
}

function makeGrid(conf) {
    // Make the table that will serve as the keyboard's structure from an array
    // of characters that indicate the layout, e.g.:

    var kbdKeys = genKbdKeys(conf);
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
