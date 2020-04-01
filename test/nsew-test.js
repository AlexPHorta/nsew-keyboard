import makeGrid from '../nsew.js';
import { StrictEqual } from 'assert';

describe("Keyboard Grid needs an Array", function() {
    describe("Not an array is an error.", function() {
        it("should raise an exception if the argument is not an array.", function() {
            gridConf = "XXX";
            err = makeGrid(gridConf)
            StrictEqual(err.message, "Not an array is an error.");        
        });
    });
});

// var gridConf;

//     QUnit.test("Keyboard Grid needs an Array", function(assert) {
//         gridConf = "XXX";
//         assert.raises(makeGrid(gridConf), "Not an array is an error.");
//     });

//     QUnit.test("Keyboard Grid, if the argument is Array", function(assert) {
//         gridConf = [];
//         assert.equal(makeGrid(gridConf), "<table></table>",
//                 "An empty array makes an empty table.");
//         gridConf = [""];
//         assert.equal(makeGrid(gridConf), "<table><tr></tr></table>",
//                 "An empty item makes an empty row.");
//     });

//     QUnit.test("Keyboard Grid, creating cells", function(assert) {
//         gridConf = ["-"];
//         assert.equal(makeGrid(gridConf), "<table><tr><td></td></tr></table>",
//                 "A dash creates a cell.");
//         gridConf = ["--"];
//         assert.equal(makeGrid(gridConf), '<table><tr><td colspan="2"></td></tr></table>',
//                 "Dashes indicate the number of merged columns");
//         gridConf = ["---", "---", "---"];
//         assert.equal(makeGrid(gridConf), '<table><tr><td colspan="3"></td></tr>' +
//                 '<tr><td colspan="3"></td></tr><tr><td colspan="3"></td>' +
//                 '</tr></table>',
//                 "The number of items is the number of rows");
//         gridConf = ["***", "---"];
//         assert.equal(makeGrid(gridConf), '<table><tr><td></td><td></td>' +
//                 '<td></td></tr><tr><td colspan="3"></td></tr></table>',
//                 "Stars make single table cells");
//     });

//     QUnit.test("Keyboard Grid, mixing cells", function(assert) {
//         gridConf = ["---*---"];
//         assert.equal(makeGrid(gridConf), '<table><tr><td colspan="3"></td>' +
//                 '<td></td><td colspan="3"></td></tr></table>',
//                 "Dashes and stars");
//         gridConf = ["*--*--*"];
//         assert.equal(makeGrid(gridConf), '<table><tr><td></td><td colspan="2"></td>' +
//             '<td></td><td colspan="2"></td><td></td></tr></table>',
//                "Dashes, and more stars");
//         gridConf = ["---0---"];
//         assert.equal(makeGrid(gridConf), '<table><tr><td colspan="3"></td>' +
//                 '<td id="0" class="key"></td><td colspan="3"></td></tr></table>',
//                "Dashes, and a zero");
//         gridConf = ["---0---", "--1-2--", "-3---4-"];
//         assert.equal(makeGrid(gridConf), '<table><tr><td colspan="3"></td>' +
//                 '<td id="0" class="key"></td><td colspan="3"></td></tr>' +
//                 '<tr><td colspan="2"></td><td id="1" class="key"></td>' +
//                 '<td></td><td id="2" class="key"></td><td colspan="2"></td></tr>' +
//                 '<tr><td></td><td id="3" class="key"></td><td colspan="3"></td>' +
//                 '<td id="4" class="key"></td><td></td></tr></table>',
//                 "Dashes, and numbers, a more complex example");
//         gridConf = ["---0---", "-1_-2_-", "-3_-4_-"];
//         assert.equal(makeGrid(gridConf), '<table><tr><td colspan="3"></td>' +
//                 '<td id="0" class="key"></td><td colspan="3"></td></tr>' +
//                 '<tr><td></td><td id="1" class="key" colspan="2"></td><td></td>' +
//                 '<td id="2" class="key" colspan="2"></td><td></td></tr>' +
//                 '<tr><td></td><td id="3" class="key" colspan="2"></td><td></td>' +
//                 '<td id="4" class="key" colspan="2"></td><td></td></tr></table>',
//                 "Underscores make a numbered cell span multiple columns");
//     });