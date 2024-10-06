var numSelected = null;
var tileSelected = null;
var errors = 0;

let timeLeft = 300; 
let timer;

function setTime(minutes) {
    timeLeft = minutes * 60; 
    TimerDisplay();
    clearInterval(timer); 
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        TimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('message').textContent = "Time's up! Game Over!";
        }
    }, 1000);
}

function TimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function finishGame() {
    clearInterval(timer);
    if (areAllTilesFilled() && timeLeft > 0) {
        document.getElementById('message').textContent = "Congratulations! You finished on time!";
    } else if (timeLeft <= 0) {
        document.getElementById('message').textContent = "Time's up! Game Over!";
    } else {
        document.getElementById('message').textContent = "You haven't filled the board completely yet!";
    }
}

function areAllTilesFilled() {
    const tiles = document.querySelectorAll('.tile');
    for (let tile of tiles) {
        if (!tile.classList.contains("tile-start") && tile.innerText === "") {
            return false;
        }
    }

    return true;
}


window.onload = function() {
    TimerDisplay();
    setGame();
};
var board = [
    "--74916-5","2---6-3-9","-----7-1-","-586----4","--3----9-","--62--187","9-4-7---2","67-83----",
    "81--45---"]

var solution = ["387491625","241568379","569327418","758619234","123784596","496253187","934176852","675832941","812945763"]


function setGame() {
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}
let darkmode = localStorage.getItem('darkmode')
const Switch = document.getElementById("switch")

const enabledarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode','active')
}

const disabledarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode',null)

}

if(darkmode === "active") enabledarkmode()
    
    
Switch.addEventListener("click",() => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enabledarkmode() : disabledarkmode()
})

