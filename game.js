document.getElementById('win').style.display="none";
var noCols;
var noRows;
var arr;
var blankindexrow;
var blankindexcol;
var value;
var blank;
var filledid;
var moves = 0;
var min = 99999;
var index = new Array(2);
function reply_click(clicked_id) {
    noRows = (parseInt(clicked_id)) / 10;
    noCols = noRows;
    document.getElementById('game').style.display = "block"
    var x = document.getElementById("a");
    x.style.display = "none"
    arr = new Array(noCols);
    document.getElementsByTagName('h2')[0].innerText = "enjoy the Game";

   
    document.getElementById('moves').innerText += moves;
    createarray(arr);
    start();
}



function start() {


    var k = 0;
    for (var i = 0; i < (noRows); i++) {
        var s = ((i + 1) * 100).toString();
        add = document.getElementById(s);
        for (var j = 0; j < noCols; j++) {
            var n = arr[i][j];
            add.innerHTML += "<div id='" + n + "' class=' col'  onclick='reply(this.id)'></div>"
            k++;
        }

    }



    for (var i = 1; i <= noCols * noRows - 1; i++) {

        var s = i.toString();
        var c = document.getElementById(s);
        c.innerText = s;


    }
    var m = noCols * noCols;
    blank = document.getElementById(m.toString());
}
function createarray(ar) {
    var k = 1;

    for (var i = 0; i < (noRows); i++) {
        ar[i] = new Array(noCols);
        for (var j = 0; j < noCols; j++) {
            ar[i][j] = k;
            k++;
        }
    }
    for (var i = 0; i < noCols; i++) {
        shuffleArray(arr[i]);
    }
}

function shuffleArray(ar) {

    for (var i = 0; i < noCols - 1; i++) {
        var i2 = getRandomIntInclusive(0, noCols - 1);
        var t = ar[i];
        ar[i] = ar[i2];
        ar[i2] = t;

    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function checkclickable(i, j) {

    findblankindex();
    var a
    if (i == blankindexrow + 1 && j == blankindexcol) { a = 1; }
    else if (i == blankindexrow - 1 && j == blankindexcol) { a = 1; }
    else if (i == blankindexrow && j == blankindexcol + 1) { a = 1; }
    else if (i == blankindexrow && j == blankindexcol - 1) { a = 1; }
    else { a = 0; }

    if (a) {
        movetile(i, j);
    }
}
function findblankindex() {

    for (var i = 0; i < noCols; i++) {
        for (var j = 0; j < noCols; j++) {
            if (arr[i][j] == noCols * noCols) { blankindexrow = i; blankindexcol = j; }
        }
    }
}


function movetile(i, j) {




    var temp = arr[blankindexrow][blankindexcol];
    arr[blankindexrow][blankindexcol] = arr[i][j];
    arr[i][j] = temp;

    var temp = filledid.innerText;
    filledid.innerText = blank.innerText;
    blank.innerText = temp;
    blank = filledid;
    moves++;
    document.getElementById('moves').innerText = "moves:" + moves;
    checkwin();

}
function reply(clicked_id) {
    clicked_id = clicked_id.toString();

    filledid = document.getElementById(clicked_id)

    value = filledid.innerText;

    findindexgivenvalue(value);

    checkclickable(index[0], index[1]);


}
function findindexgivenvalue(value) {

    for (var i = 0; i < noCols; i++) {
        for (j = 0; j < noCols; j++) {
            if (arr[i][j] == value) { index[0] = i; index[1] = j; }
        }


    }
}
function reset() {
    window.location.reload();

}
function checkwin() {
    var t = 1, flag = 1;
    for (var i = 0; i < noCols; i++) {
        for (var j = 0; j < noCols; j++) {
            if (arr[i][j] != t) { flag = 0; }
            t++;
        }



    }


    if (flag) {
        document.getElementById('game').style.display = "none";
        
        if (min > moves) { min = moves; }
        document.getElementById('win').style.display="block";
        document.getElementById('win').innerHTML = "<div class='win'>congo you win<br>current HIGH-SCORE: " + min +"<br> time-taken: "+ seconds+"</div>"
          
    }
}
var seconds = 0;
var el = document.getElementById('time');

function incrementSeconds() {
    seconds += 1;
    el.innerText = "time: "+seconds ;
}

var cancel = setInterval(incrementSeconds, 1000);