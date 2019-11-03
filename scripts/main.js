
/****************************************************************************
 *
 *    NSEW Script-based Virtual Keyboard - Version 0.1 - 10/31/2019
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

var NSEW_layout =
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

var meta = {
    active: 0,
    options: 4,
    shift: function(){
        this.active = (this.active + 1) % this.options;
    }
};

var paths =
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
        [25, 0, 17, 28], [29, 27, 12, 0], [24, 4, 28, 4]];


function populate(){

    var charKeys = document.getElementsByClassName("char");
    var numChars = charKeys.length;
    var metaActive = meta.active;

    for (i = 0; i < numChars; i++){
        charKeys[i].innerText = NSEW_layout[Number(charKeys[i].id)][metaActive];
    }
}


function walk(event){

    var press = event.key;
    var active = document.getElementsByClassName("active")[0];
    var activeId = active.id;
    var neighbor;
    var selected = null;

    if (press == "8"){
        neighbor = 0;
    }
    else if (press == "6"){
        neighbor = 1;
    }
    else if (press == "2"){
        neighbor = 2;
    }
    else if (press == "4"){
        neighbor = 3;
    }
    else if (press == "5"){
        selected = NSEW_layout[Number(activeId)];
        select(selected);
        neighbor = 26;
    }

    var jumpto;

    if (neighbor == 26){
        var jumpto = neighbor; 
    }
    else {
        var jumpto = paths[Number(activeId)][neighbor];
    }

    if (jumpto >= 0){
        draw(activeId, jumpto);
    }
}


function select(key){

    if (key.includes("Meta")){
        meta.shift();
        populate();
    }
    else{
        var key = key[meta.active];
        var kbd = document.getElementsByClassName("NSEW_input")[0];
    }

    switch(key){
        case "Bksp":
            kbd.value = kbd.value.slice(0,-1);
            break;
        default:
            kbd.value += key;
            break;
    }
}


function draw(here, whereto){

    var h = Number(here);
    var w = Number(whereto);

    document.getElementById(h.toString()).className =
    document.getElementById(h.toString()).className.replace( /(?:^|\s)active(?!\S)/g , '' );

    document.getElementById(w.toString()).className += " active";
}


populate();
document.addEventListener("keypress", walk);
