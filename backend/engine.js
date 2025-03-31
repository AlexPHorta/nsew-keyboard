"use strict"

/** Define the alphanumeric half of the keyboard **/
const en = new Set([
        ["e", "E"], ["t", "T"], ["a", "A"],
        ["o", "O"], ["i", "I"], ["n", "N"],
        ["s", "S"], ["h", "H"], ["r", "R"],
        ["d", "D"], ["l", "L"], ["c", "C"],
        ["u", "U"], ["m", "M"], ["w", "W"],
        ["f", "F"], ["g", "G"], ["y", "Y"],
        ["p", "P"], ["b", "B"], ["v", "V"],
        ["k", "K"], ["j", "J"], ["x", "X"],
        ["q", "Q"], ["z", "Z"], ["Mode", "Mode"],
        ["Spc", "Spc"], ["Bksp", "Bksp"], ["Cls", "Cls"]
]);

const pt = new Set([
        ["a", "A"], ["e", "E"], ["o", "O"],
        ["s", "S"], ["r", "R"], ["i", "I"],
        ["n", "N"], ["d", "D"], ["m", "M"],
        ["u", "U"], ["t", "T"], ["c", "C"],
        ["l", "L"], ["p", "P"], ["v", "V"],
        ["g", "G"], ["h", "H"], ["q", "Q"],
        ["b", "B"], ["f", "F"], ["z", "Z"],
        ["j", "J"], ["x", "X"], ["k", "K"],
        ["w", "W"], ["y", "Y"], ["Mode", "Mode"],
        ["Spc", "Spc"], ["Bksp", "Bksp"], ["Cls", "Cls"]
]);

export const alphachar = {
    eng: en,
    por: pt
}

/** Define the symbol/numeric half of the keyboard **/
const symbnum = new Set([
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
]);

export const symbnumchar = {
    def: symbnum
}

/** Control the state of the keyboard. **/
export let config = {
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
