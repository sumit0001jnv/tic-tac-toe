const music = new Audio("music.mp3")
const turnMusic = new Audio("ting.mp3")
const gameover = new Audio("gameover.mp3");
let isGameover = false;

let turn = "X";

const changeTurn = () => {
    turn = turn == "X" ? "0" : "X"
}

function onSoundClick(isSoundPlay) {
    if (isSoundPlay) {
        music.play();
        document.querySelector("#sound-on").style.display = 'none';
        document.querySelector("#sound-off").style.display = 'block';
    }else{
        music.pause();
        document.querySelector("#sound-off").style.display = 'none';
        document.querySelector("#sound-on").style.display = 'block';
    }
}



const checkWin = () => {
    let winPossiblities = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let textBoxes = document.getElementsByClassName("textbox");


    winPossiblities.forEach(possiblity => {


        if (textBoxes[possiblity[0]].innerText !== '' &&
            textBoxes[possiblity[0]].innerText === textBoxes[possiblity[1]].innerText &&
            textBoxes[possiblity[0]].innerText === textBoxes[possiblity[2]].innerText) {
            isGameover = true;
            document.querySelector(".turn").innerText = turn + " won";
            document.querySelector(".imgbox").style.display = "block";
            gameover.play();
            let containerX = document.querySelector(".container").getBoundingClientRect().x + 16;
            let containerY = document.querySelector(".container").getBoundingClientRect().y + 16;
            let containerWidth = document.querySelector(".container").getBoundingClientRect().width - 32;
            let containerHeight = document.querySelector(".container").getBoundingClientRect().height - 32;
            document.querySelector("svg").style.display = "block";
            document.querySelector("svg").parentElement.style.zIndex = 1;
            document.querySelector("svg").style.transform = `translate(${containerX}px,${containerY}px)`;
            document.querySelector("svg").style.width = `${containerWidth}px`;
            document.querySelector("svg").style.height = `${containerHeight}px`;
            document.querySelector("line").setAttribute("x1", ([0, 3, 6].includes(possiblity[0]) ? 0 : [1, 4, 7].includes(possiblity[0]) ? 1 : 2) * containerWidth / 3 + containerWidth / 6);
            document.querySelector("line").setAttribute("y1", ([0, 1, 2].includes(possiblity[0]) ? 0 : [3, 4, 5].includes(possiblity[0]) ? 1 : 2) * containerHeight / 3 + containerHeight / 6);
            document.querySelector("line").setAttribute("x2", ([0, 3, 6].includes(possiblity[2]) ? 0 : [1, 4, 7].includes(possiblity[2]) ? 1 : 2) * containerWidth / 3 + containerWidth / 6);
            document.querySelector("line").setAttribute("y2", ([0, 1, 2].includes(possiblity[2]) ? 0 : [3, 4, 5].includes(possiblity[2]) ? 1 : 2) * containerHeight / 3 + containerHeight / 6);
        }
    })

}

let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(box => {
    box.addEventListener("click", (e) => {
        if (!isGameover) {
            if (e.target.children[0].innerText == '') {
                e.target.children[0].innerText = turn;
                turnMusic.play();
                checkWin();
                if (!isGameover) {
                    changeTurn();
                    document.getElementsByClassName("turn")[0].innerText = "Turn for " + turn;
                }
            }
        }
    })
})

let resetButton = document.getElementById("reset");
resetButton.onclick = () => {
    isGameover = false;
    turn = "X";
    document.querySelector(".turn").innerText = "Turn for X";
    document.querySelector(".imgbox").style.display = "none";
    document.querySelector("svg").style.display = "none";
    let textBoxes = document.getElementsByClassName("textbox");
    Array.from(textBoxes).forEach(textBox => {
        textBox.innerText = '';
    })
}


