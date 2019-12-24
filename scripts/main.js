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

"use strict";


class NSEWK {

    constructor(){

        this.layout =
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

        this.routes =
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

        this.meta = {
        active: 0,
        options: 4,
        alter: function(){
            this.active = (this.active + 1) % this.options;
            }
        };

        this.up = "8";
        this.right = "6";
        this.down = "2";
        this.left = "4";
        this.enter = "5";

    }

    populate(){
        let charKeys = document.getElementsByClassName("char");
        let numChars = charKeys.length;
        let metaActive = this.meta.active;

        for (let i = 0; i < numChars; i++){
            charKeys[i].innerText = this.layout[Number(charKeys[i].id)][metaActive];
        }
    }

    walk(event){
        let press = String(event.key);
        let active = document.getElementsByClassName("active")[0];
        let activeId = active.id;
        let neighbor;
        let selected = null;
        let jumpto;

        if (press === this.up){
            neighbor = 0;
        }
        else if (press === this.right){
            neighbor = 1;
        }
        else if (press === this.down){
            neighbor = 2;
        }
        else if (press === this.left){
            neighbor = 3;
        }
        else if (press === this.enter){
            selected = this.layout[Number(activeId)];
            this.select(selected);
            if (selected.includes("Bksp")){
                neighbor = 28;
            }
            else {
                neighbor = 26;
            }
        }

        if (neighbor == 26){
            jumpto = neighbor;
        }
        else {
            jumpto = this.routes[Number(activeId)][neighbor];
        }

        if (jumpto >= 0){
            this.draw(activeId, jumpto);
        }
    }

    select(key){

        if (key.includes("Meta")){
            this.meta.alter();
            this.populate();
        }
        else{
            let key_ = key[this.meta.active];
            let kbd = document.getElementsByClassName("NSEW_input")[0];
            let kbdLen = kbd.length;
        }

        switch(key_){
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

    draw(here, whereto){
        let h = Number(here);
        let w = Number(whereto);

        document.getElementById(h.toString()).className =
        document.getElementById(h.toString()).className.replace( /(?:^|\s)active(?!\S)/g , '' );

        document.getElementById(w.toString()).className += " active";
    }
}

let keyboard = new NSEWK();
keyboard.populate();
document.addEventListener("keydown", keyboard.walk);

// let NSEW_layout =
//         [
//         ["e", "E", ".", "1"], ["t", "T", ",", "7"], ["a", "A", ";", "0"],
//         ["o", "O", ":", "4"], ["i", "I", "!", "2"], ["n", "N", "?", "8"],
//         ["s", "S", "'", "¢"], ["h", "H", '"', "5"], ["r", "R", "-", "3"],
//         ["d", "D", ")", "9"], ["l", "L", "@", "%"], ["c", "C", "(", "6"],
//         ["u", "U", "#", "/"], ["m", "M", "$", ","], ["w", "W", "&", "-"],
//         ["f", "F", "*", "+"], ["g", "G", "_", "."], ["y", "Y", "~", "*"],
//         ["p", "P", "^", "|"], ["b", "B", "/", "º"], ["v", "V", "]", "¬"],
//         ["k", "K", "[", "£"], ["j", "J", "<", "ª"], ["x", "X", ">", "\\"],
//         ["q", "Q", "}", "="], ["z", "Z", "{", "°"], ["Meta", "Meta", "Meta", "Meta"],
//         [" ", " ", " ", " "], ["Bksp", "Bksp", "Bksp", "Bksp"],
//         ["Cls", "Cls", "Cls", "Cls"]];

// let meta = {
//     active: 0,
//     options: 4,
//     alter: function(){
//         this.active = (this.active + 1) % this.options;
//     }
// };

// let paths =
//         [
//         [4, 28, 26, 27], [12, 5, 13, 26], [26, 14, 6, 15],
//         [17, 26, 16, 7], [8, 29, 0, 29],  [18, 9, 19, 1],
//         [2, 20, 10, 21], [23, 3, 22, 11], [10, -1, 4, -1],
//         [-1, 11, -1, 5], [6, 24, 8, 25],  [-1, 7, -1, 9],
//         [28, 18, 1, 26], [1, 19, -1, 26], [26, 15, 20, 2],
//         [26, 2, 21, 14], [3, 26, -1, 22], [27, 26, 3, 23],
//         [28, 23, 5, 12], [5, 22, 18, 13], [14, 21, 24, 6],
//         [15, 6, 25, 20], [7, 16, 23, 19], [22, 17, 7, 18],
//         [20, 25, 29, 10],[21, 10, 27, 24],[0, 1, 2, 3],
//         [25, 0, 26, 28], [29, 27, 26, 0], [24, 4, 28, 4]];

// let controls = {
//     up: "8",
//     right: "6",
//     down: "2",
//     left: "4",
//     enter: "5"
// };

// function populate(){

//     let charKeys = document.getElementsByClassName("char");
//     let numChars = charKeys.length;
//     let metaActive = meta.active;

//     for (i = 0; i < numChars; i++){
//         charKeys[i].innerText = NSEW_layout[Number(charKeys[i].id)][metaActive];
//     }
// }


// function walk(event){

//     let press = event.key;
//     let active = document.getElementsByClassName("active")[0];
//     let activeId = active.id;
//     let neighbor;
//     let selected = null;

//     if (press == controls.up){
//         neighbor = 0;
//     }
//     else if (press == controls.right){
//         neighbor = 1;
//     }
//     else if (press == controls.down){
//         neighbor = 2;
//     }
//     else if (press == controls.left){
//         neighbor = 3;
//     }
//     else if (press == controls.enter){
//         selected = NSEW_layout[Number(activeId)];
//         select(selected);
//         if (selected.includes("Bksp")){
//             neighbor = 28;
//         }
//         else {
//             neighbor = 26;
//         }
//     }

//     let jumpto;

//     if (neighbor == 26){
//         let jumpto = neighbor;
//     }
//     else {
//         let jumpto = paths[Number(activeId)][neighbor];
//     }

//     if (jumpto >= 0){
//         draw(activeId, jumpto);
//     }
// }


// function select(key){

//     if (key.includes("Meta")){
//         meta.alter();
//         populate();
//     }
//     else{
//         let key = key[meta.active];
//         let kbd = document.getElementsByClassName("NSEW_input")[0];
//         let kbdLen = kbd.length;
//     }

//     switch(key){
//         case "Bksp":
//             kbd.value = kbd.value.slice(0,-1);
//             break;
//         case "Cls":
//             kbd.value = kbd.value.slice(0, kbdLen-1);
//             break;
//         default:
//             kbd.value += key;
//             break;
//     }
// }


// function draw(here, whereto){

//     let h = Number(here);
//     let w = Number(whereto);

//     document.getElementById(h.toString()).className =
//     document.getElementById(h.toString()).className.replace( /(?:^|\s)active(?!\S)/g , '' );

//     document.getElementById(w.toString()).className += " active";
// }
