let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.getElementById("reset-game");
let turnMsg = document.getElementById("turn-msg");
let msg = document.getElementById("msg");
let bgMusic = new Audio("music.mp3");
let turnMusic = new Audio("tingnew.mp3");
let gameWinMusic = new Audio("gamewin.wav");
let gameDrawAudio= new Audio("ooh.mp3");
let count=0;
let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];



function enableBtns() {
  boxes.forEach((e) => {
    e.disabled = false;
    e.innerText = "";
  });
}

function disableBtns() {
  boxes.forEach((e) => {
    e.disabled = true;
  });
}

function showWinner(winner) {
  disableBtns();
  msg.innerText = `Congratulations! Winner is "${winner}"`;
  turnMsg.innerText = ``;
  document.querySelector("img").style.width = "200px";
  gameWinMusic.play();
  resetGameBtn.innerText="New Game";
}

function checkWinner() {
  for (const pattern of winPatterns) {
    // console.log(pattern[0], pattern[1],pattern[2]);
    // console.log(boxes[pattern[0]], boxes[pattern[1]],boxes[pattern[2]]);

    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("Winner=", pos1);
        boxes[pattern[0]].style.color="white";
        boxes[pattern[1]].style.color="white";
        boxes[pattern[2]].style.color="white";
        showWinner(pos1);
        return true;
      }
    }
  }
}

const gameDraw = () => {
  gameDrawAudio.play();

  msg.innerText = `Game was a Draw`;
  turnMsg.innerText = `Play Again`;
  resetGameBtn.innerText="New Game";
  disableBtns();
};

// Game Logic
let turnX = true;
// bgMusic.play();

boxes.forEach((e) => {
  e.addEventListener("click", () => {
    if (turnX) {
      e.innerHTML = "X";
      turnMusic.play();
      turnX = false;
      turnMsg.innerText = "Turn for O";
    } else {
      e.innerHTML = "O";
      turnMusic.play();
      turnX = true;
      turnMsg.innerText = "Turn for X";
    }
    e.disabled = true;
    count++;
    let isWinner= checkWinner();
    if (count===9 && !isWinner) {
      gameDraw();
    }
  });
});

const resetGame = () => {
  count=0;
  turnX = true;
  enableBtns();
  turnMsg.innerText = "Turn for X";
  msg.innerText = `Welcome🤗`;
  resetGameBtn.innerText="Reset Game";
  document.querySelector("img").style.width = "0";
  boxes.forEach((e)=>{
    e.style.color="rgb(11, 11, 12)";
  });
};

resetGameBtn.addEventListener("click", () => {
  console.log("Reset game button clicked");
  resetGame();
});
