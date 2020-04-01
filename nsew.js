/** Define the alphanumeric half of the keyboard **/
let alphachar = {
    eng: [
        ["e", "E"], ["t", "T"], ["a", "A"],
        ["o", "O"], ["i", "I"], ["n", "N"],
        ["s", "S"], ["h", "H"], ["r", "R"],
        ["d", "D"], ["l", "L"], ["c", "C"],
        ["u", "U"], ["m", "M"], ["w", "W"],
        ["f", "F"], ["g", "G"], ["y", "Y"],
        ["p", "P"], ["b", "B"], ["v", "V"],
        ["k", "K"], ["j", "J"], ["x", "X"],
        ["q", "Q"], ["z", "Z"], ["Mode", "Mode"],
        ["Spc", "Spc"], ["Bksp", "Bksp"],
        ["Cls", "Cls"]
    ],
    por: [
        ["a", "A"], ["e", "E"], ["o", "O"],
        ["s", "S"], ["r", "R"], ["i", "I"],
        ["n", "N"], ["d", "D"], ["m", "M"],
        ["u", "U"], ["t", "T"], ["c", "C"],
        ["l", "L"], ["p", "P"], ["v", "V"],
        ["g", "G"], ["h", "H"], ["q", "Q"],
        ["b", "B"], ["f", "F"], ["z", "Z"],
        ["j", "J"], ["x", "X"], ["k", "K"],
        ["w", "W"], ["y", "Y"], ["Mode", "Mode"],
        ["Spc", "Spc"], ["Bksp", "Bksp"],
        ["Cls", "Cls"]
    ]
}

/** Define the symbol/numeric half of the keyboard **/
let symbnumchar = {
    def: [
        [".", "1"], [",", "7"], [";", "0"],
        [":", "4"], ["!", "2"], ["?", "8"],
        ["'", "¢"], ['"', "5"], ["-", "3"],
        [")", "9"], ["@", "%"], ["(", "6"],
        ["#", "/"], ["$", ","], ["&", "-"],
        ["*", "+"], ["_", "."], ["~", "*"],
        ["^", "|"], ["/", "º"], ["]", "¬"],
        ["[", "£"], ["<", "ª"], [">", "\\"],
        ["}", "="], ["{", "°"], ["Mode", "Mode"],
        ["Spc", "Spc"], ["Bksp", "Bksp"], ["Cls", "Cls"]
    ]
}

/** Control the state of the keyboard. **/
let config = {
    active: 0,
    options: 4,
    capslock: false,
    alpha: 'eng',
    symbnum: 'def',

    def: function(){
        this.active = 0;
        populate();
    },

    alter: function(){
        this.active = (this.active + 1) % this.options;
        populate();
    }
};

/** Create the keyboard layout from the selected halves. **/
let NSEW_layout = alphachar[config.alpha].map(
            function(e, i) {
                return e.concat(symbnumchar[config.symbnum][i]);
            }
        );

/** Define the possible paths of the cursor. **/
let paths = [
    [4, 28, 26, 27], [12, 5, 13, 26], [26, 14, 6, 15],
    [17, 26, 16, 7], [8, 29, 0, 29],  [18, 9, 19, 1],
    [2, 20, 10, 21], [23, 3, 22, 11], [10, -1, 4, -1],
    [-1, 11, -1, 5], [6, 24, 8, 25],  [-1, 7, -1, 9],
    [28, 18, 1, 26], [1, 19, -1, 26], [26, 15, 20, 2],
    [26, 2, 21, 14], [3, 26, -1, 22], [27, 26, 3, 23],
    [28, 23, 5, 12], [5, 22, 18, 13], [14, 21, 24, 6],
    [15, 6, 25, 20], [7, 16, 23, 19], [22, 17, 7, 18],
    [20, 25, 29, 10],[21, 10, 27, 24],[0, 1, 2, 3],
    [25, 0, 26, 28], [29, 27, 26, 0], [24, 4, 28, 4]
];

/** Define the physical keyboard keys to be used to control the keyboard **/
let controls = {
    up: "8",
    right: "6",
    down: "2",
    left: "4",
    enter: "5"
};

/** Fill the keyboard table with the corresponding letters/characters. **/
function populate(){
    let charKeys = document.getElementsByClassName("key");
    let numChars = charKeys.length;
    let activeConf = config.active;

    for (i = 0; i < numChars; i++){
        charKeys[i].innerText =
        NSEW_layout[Number(charKeys[i].id)][activeConf];
    }
}

/**
* Control the movement of the active key.
* @param {object} event - a keyboard event.
*/
function walk(event){
    let press = event.key;
    let activeId = document.getElementsByClassName("active")[0].id;
    let neighbor;
    let selected = null;
    let jumpto;

    switch (press){
        case controls.up:
            neighbor = 0;
            break;
        case controls.right:
            neighbor = 1;
            break;
        case controls.down:
            neighbor = 2;
            break;
        case controls.left:
            neighbor = 3;
            break;
        case controls.enter:
            selected = NSEW_layout[Number(activeId)];
            select(selected);
            if (selected.includes("Bksp")){
                neighbor = 28;
            }
            else {
                neighbor = 26;
            }
            break;
    }

    if (neighbor == 26){
        jumpto = neighbor;
    }
    else {
        jumpto = paths[Number(activeId)][neighbor];
    }

    if (jumpto >= 0){
        draw(activeId, jumpto);
    }
}

/**
* Fire the correspondent key character/action to the input area.
* @param {array} key_ - An array with the corresponding outputs for each keyboard mode.
*/
function select(key_){
    let key = key_[config.active];
    let kbd = document.getElementsByClassName("NSEW_input")[0];
    let kbdLen = kbd.length;

    switch(key){
        case "Mode":
            config.alter();
            break;
        case "Bksp":
            kbd.value = kbd.value.slice(0,-1);
            break;
        case "Cls":
            kbd.value = kbd.value.slice(0, kbdLen-1);
            break;
        case "Spc":
            kbd.value += " ";
            break;
        default:
            kbd.value += key;
            if (config.active === 1){
                if (config.capslock === false) {
                    config.def();
                }
            }
            break;
    }
}

/**
* Change the classes of the keys, for visual feedback.
*/
function draw(here, whereto){
    let h = Number(here);
    let w = Number(whereto);

    document.getElementById(h.toString()).classList.remove('active');
    document.getElementById(w.toString()).classList.add('active');
}

/************************************************/
/* Automatic generation of the keyboard's table */
/************************************************/

/**
 * Define the keyboard's structure.
 * 
 * 1. Dashes '-' create a 'colspan' empty cell with 'colspan' being
 *    the number of dashes;
 * 2. Numbers and characters from [0-9] and [a-t] create the cells with
 *    sequential numeric IDs;
 * 3. Underlines, when following a character from number 2 and above, make
 *    the cell a 'colspan' one.
 */
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

/** Generate the string that will determine the id's of the keys. **/
function genKbdKeys(conf) {
    'use strict';
    let kbdKeys = conf.toString();
    kbdKeys = kbdKeys.replace(/-|_|\*|,/g,'');
    kbdKeys = kbdKeys.split('').sort().join('');
    return kbdKeys;
}

/**
*  Make the table that will serve as the keyboard's structure from an array
*  of characters that indicate the layout.
*/
export function makeGrid(conf) {
    'use strict';
    console.assert(conf instanceof Array, 'Feed me an Array!');
    let kbdKeys = genKbdKeys(conf);
    let gridContents = [];
    let tbl = document.createElement('table');
    tbl.id = 'kbd';

    function Cell (elem, quant) {
        'use strict';
        this.elem = elem;
        this.quant = quant;
        this.incr = function () {
            this.quant++;
        };
    }

    function mkCells (line) {
        'use strict';
        let objs = [];
        for (let c in line) {
            if (line[c] === '*' || (line[c] !== line[c-1] && line[c] !== '_')) {
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
                td.classList.add('key');
            }
            if (keyId >= 0 && keyId <= 25) {
                td.classList.add('char');
            }
            if (keyId === 26) {
                td.classList.add('mode', 'active');
            }
            if (celSp > 1) {
                td.colSpan = celSp;
            }
            tr.appendChild(td);
        }
        tbl.appendChild(tr);
    }
    return tbl;
}

/** Insert the keyboard in the destination html element. */
function insertKbd(grid) {
    let container = document.getElementById('NSEW_container');
    let kbd = makeGrid(grid);
    container.appendChild(kbd);
}

insertKbd(kbdGrid);
populate();
document.addEventListener("keydown", walk);
