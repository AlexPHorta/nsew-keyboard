function makeGrid(conf) {
    var confIsArray = conf instanceof Array;

    if (!confIsArray) {
        throw new Error('Error');
    }
    else {
        var confLen = conf.length;
        if (confLen == 0) {
            return "<table></table>";
        }
        else if (confLen == 1){
            if (conf[0] === ""){
                return "<table><tr></tr></table>";
            }
            else if (conf[0] === "-"){
                return "<table><tr><td></td></tr></table>";
            }
        }
    }
}
