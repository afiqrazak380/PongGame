
const gameBoard = document.querySelector("#gameBoard");
const contex = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBoarder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0
}
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

function gameStart(){};
function nextTick(){};
function clearBoard(){};
function drawPaddles(){};
function createBall(){};
function moveBall(){};
function drawBall(){};
function checkCollision(){};
function changeDirection(){};
function updateScore(){};
function resetGame(){};
