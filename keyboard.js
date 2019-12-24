"use strict";


let kbdGrid =
          ["-----8-----",
           "-----4t_---",
           "---r_0s_---",
           "-----------",
           "--nh---ci--",
           "-b73-q-159-",
           "--mg---dj--",
           "-----------",
           "----f2e----",
           "----l6k----",
           "----pao----"];

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
    // of characters that indicate the layout.

    console.assert(conf instanceof Array, "Feed me an Array!");
    let kbdKeys = genKbdKeys(conf);
    let gridContents = [];
    let tbl = document.createElement('table');

    function Cell (elem, quant) {
        this.elem = elem;
        this.quant = quant;
        this.incr = function () {
            this.quant++;
        };
    }

    function mkCells (line) {
        let objs = [];
        for (let c in line) {
            if (line[c] === "*" || (line[c] !== line[c-1] && line[c] !== "_")) {
                let ob = new Cell(line[c], 1);
                objs.push(ob);
            } else {
                objs[objs.length-1].incr();
            }
        }
        return objs;
    }

    for (let ln in conf) {
        let tr = document.createElement('tr');
        let lin = mkCells(conf[ln]);
        for (let ob in lin) {
            let keyId = kbdKeys.indexOf(lin[ob].elem);
            let celSp = lin[ob].quant;
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
