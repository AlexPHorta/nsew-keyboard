var NSEW_layout =
        [
        ["e", "E"], ["t", "T"], ["a", "A"],
        ["o", "O"], ["i", "I"], ["n", "N"],
        ["s", "S"], ["h", "H"], ["r", "R"],
        ["d", "D"], ["l", "L"], ["c", "C"],
        ["u", "U"], ["m", "M"], ["w", "W"],
        ["f", "F"], ["g", "G"], ["y", "Y"],
        ["p", "P"], ["b", "B"], ["v", "V"],
        ["k", "K"], ["j", "J"], ["x", "X"],
        ["q", "Q"], ["z", "Z"], ["Meta", "Meta"],
        [" ", " "], ["Bksp", "Bksp"]];

var meta = {
    active: 0,
    options: 2,
    shift: function(){
        this.active = (this.active + 1) % this.options;
    }
};

var paths =
        [
        [4, 28, 26, 27], [28, 5, -1, 26], [26, 16, 6, 15],
        [27, 26, -1, 7], [8, -1, 0, -1],  [28, 9, -1, 1],
        [2, 18, 10, 17], [27, 3, -1, 11], [24, -1, 4, -1],
        [28, 13, -1, 5], [6, 20, 14, 19], [27, 7, -1, 12],
        [27, 11, -1, 13],[28, 12, -1, 9], [10, 22, 24, 21],
        [26, 2, 17, -1], [26, -1, 18, 2], [15, 6, 19, -1],
        [16, -1, 20, 6], [17, 10, 21, -1],[18, -1, 22, 10],
        [19, 14, 23, -1],[20, -1, 25, 14],[21, 24, 8, -1],
        [14, 25, 8, 23], [22, -1, 8, 24], [0, 1, 2, 3],
        [-1, 0, 3, 28],  [-1, 27, 1, 0]];


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
