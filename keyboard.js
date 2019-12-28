/****************************************************************************
 *
 *    NSEW Virtual Keyboard - Version 0.1 - 10/31/2019
 *
 *    Copyright 2019 - Alexandre Paloschi Horta
 *
 *    Licensed under GPL
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 ***************************************************************************/


let NSEW_layout =
        [
        ["e", "E", ".", "1"], ["t", "T", ",", "7"], ["a", "A", ";", "0"],
        ["o", "O", ":", "4"], ["i", "I", "!", "2"], ["n", "N", "?", "8"],
        ["s", "S", "'", "¢"], ["h", "H", '"', "5"], ["r", "R", "-", "3"],
        ["d", "D", ")", "9"], ["l", "L", "@", "%"], ["c", "C", "(", "6"],
        ["u", "U", "#", "/"], ["m", "M", "$", ","], ["w", "W", "&", "-"],
        ["f", "F", "*", "+"], ["g", "G", "_", "."], ["y", "Y", "~", "*"],
        ["p", "P", "^", "|"], ["b", "B", "/", "º"], ["v", "V", "]", "¬"],
        ["k", "K", "[", "£"], ["j", "J", "<", "ª"], ["x", "X", ">", "\\"],
        ["q", "Q", "}", "="], ["z", "Z", "{", "°"], ["Meta", "Meta", "Meta", "Meta"],
        [" ", " ", " ", " "], ["Bksp", "Bksp", "Bksp", "Bksp"],
        ["Cls", "Cls", "Cls", "Cls"]];

let meta = {
    active: 0,
    options: 4,
    alter: function(){
        this.active = (this.active + 1) % this.options;
    }
};

let paths =
        [
        [4, 28, 26, 27], [12, 5, 13, 26], [26, 14, 6, 15],
        [17, 26, 16, 7], [8, 29, 0, 29],  [18, 9, 19, 1],
        [2, 20, 10, 21], [23, 3, 22, 11], [10, -1, 4, -1],
        [-1, 11, -1, 5], [6, 24, 8, 25],  [-1, 7, -1, 9],
        [28, 18, 1, 26], [1, 19, -1, 26], [26, 15, 20, 2],
        [26, 2, 21, 14], [3, 26, -1, 22], [27, 26, 3, 23],
        [28, 23, 5, 12], [5, 22, 18, 13], [14, 21, 24, 6],
        [15, 6, 25, 20], [7, 16, 23, 19], [22, 17, 7, 18],
        [20, 25, 29, 10],[21, 10, 27, 24],[0, 1, 2, 3],
        [25, 0, 26, 28], [29, 27, 26, 0], [24, 4, 28, 4]];

let controls = {
    up: "8",
    right: "6",
    down: "2",
    left: "4",
    enter: "5"
};

/** Fills the keyboard table with the corresponding letters/characters. */
function populate(){
    let charKeys = document.getElementsByClassName("char");
    let numChars = charKeys.length;
    let metaActive = meta.active;

    for (i = 0; i < numChars; i++){
        charKeys[i].innerText = NSEW_layout[Number(charKeys[i].id)][metaActive];
    }
}

/**
* Controls the movement of the active key.
* @param {object} event - a keyboard event.
*/
function walk(event){
    let press = event.key;
    let active = document.getElementsByClassName("active")[0];
    let activeId = active.id;
    let neighbor;
    let selected = null;

    if (press == controls.up){
        neighbor = 0;
    }
    else if (press == controls.right){
        neighbor = 1;
    }
    else if (press == controls.down){
        neighbor = 2;
    }
    else if (press == controls.left){
        neighbor = 3;
    }
    else if (press == controls.enter){
        selected = NSEW_layout[Number(activeId)];
        select(selected);
        if (selected.includes("Bksp")){
            neighbor = 28;
        }
        else {
            neighbor = 26;
        }
    }

    let jumpto;

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
* Fires the correspondent key character/action to the input area.
* @param {array} key_ - An array with the corresponding outputs for each keyboard mode.
*/
function select(key_){
    let key = key_[meta.active];
    let kbd = document.getElementsByClassName("NSEW_input")[0];
    let kbdLen = kbd.length;
    switch(key){
        case "Meta":
            meta.alter();
            populate();
            break;
        case "Bksp":
            kbd.value = kbd.value.slice(0,-1);
            break;
        case "Cls":
            kbd.value = kbd.value.slice(0, kbdLen-1);
            break;
        default:
            kbd.value += key;
            break;
    }
}

/**
* Changes the classes of the keys, for visual feedback.
*/
function draw(here, whereto){
    let h = Number(here);
    let w = Number(whereto);

    document.getElementById(h.toString()).className =
    document.getElementById(h.toString()).className.replace( /(?:^|\s)active(?!\S)/g , '' );

    document.getElementById(w.toString()).className += " active";
}

populate();
document.addEventListener("keydown", walk);


/* Automatic generation of the keyboard's table */

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
    'use strict';
    let kbdKeys = conf.toString();
    kbdKeys = kbdKeys.replace(/-|_|\*|,/g,'');
    kbdKeys = kbdKeys.split('').sort().join('');
    console.log(kbdKeys);
    return kbdKeys;
}

function makeGrid(conf) {
    // Make the table that will serve as the keyboard's structure from an array
    // of characters that indicate the layout.
    'use strict';
    console.assert(conf instanceof Array, 'Feed me an Array!');
    let kbdKeys = genKbdKeys(conf);
    let gridContents = [];
    let tbl = document.createElement('table');

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
