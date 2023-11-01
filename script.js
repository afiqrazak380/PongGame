// Get the canvas and context
const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");

// DOM elements and game properties
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
const paddleSpeed = 50;

// Variables for the game
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

// Event listeners
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

// Initialize the game
gameStart();

// Function to start the game
function gameStart(){
  createBall();
  nextTick();
};

// Function to run the game loop
function nextTick(){
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick()
  }, 10)
};

// Function to clear the canvas 
function clearBoard(){
  context.fillStyle = boardBackground;
  context.fillRect(0, 0, gameWidth, gameHeight);
};

// Function to draw the paddles
function drawPaddles(){
  context.strokeStyle = paddleBoarder;

  context.fillStyle = paddle1Color;
  context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  context.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  context.fillStyle = paddle2Color;
  context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  context.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};

// Function to create the ball
function createBall(){
  ballSpeed = 1;
  // another options to randomize the direction after ball is created
  // ballXDirection = Math.random() < 0.5 ? 1 : -1;
  // ballYDirection = Math.random() < 0.5 ? 1 : -1;
 
  if(Math.round(Math.random()) == 1){
    ballXDirection = 1;
  }
  else{
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } else {
    ballYDirection = -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
};

// Function to move the ball
function moveBall(){
  ballX += (ballSpeed * ballXDirection);
  ballY += (ballSpeed * ballYDirection);
}; 

// Function to draw the ball
function drawBall(){
  context.fillStyle = ballColor;
  context.strokeStyle = ballBorderColor;
  context.lineWidth = 2;
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  context.stroke(); // CanvasDrawPath.stroke(): void
  context.fill();
};

// Function to check for collisions
function checkCollision(){
  if(ballY <= 0 + ballRadius || ballY >= gameHeight - ballRadius){
    ballYDirection *= -1;
  }
  if(ballX <= 0){
    player2Score +=1;
    updateScore();
    createBall();
    return
  }
  if(ballX >= gameWidth){
    player1Score +=1;
    updateScore();
    createBall();
    return
  }
  if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
    if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
      ballX = paddle1.x + paddle1.width + ballRadius; // if ball get stuck reset ball on the collision coordinate
      ballXDirection *= -1;
      ballSpeed +=1;
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
      ballX = paddle2.x - ballRadius; 
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
};

// Function to handle key presses and change paddle direction
function changeDirection(event){
  const keyPressed = event.keyCode;

  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
      if(paddle1.y > 0){
        paddle1.y -= paddleSpeed;
      }
    break;
    case paddle1Down:
      if(paddle1.y < gameHeight - paddle1.height){
        paddle1.y += paddleSpeed;
      }
    break;
    case paddle2Up:
      if(paddle2.y > 0){
        paddle2.y -= paddleSpeed;
      }
    break;
    case paddle2Down:
      if(paddle2.y < gameHeight - paddle2.height){
        paddle2.y += paddleSpeed;
      }
    break;
  }
};

// Function to update the scoro display
function updateScore(){
  scoreText.textContent = `${player1Score} : ${player2Score}`
};

// Fucntion to reset the game
function resetGame(){
  player1Score = 0;
  player2Score = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
  };
  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
  };
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
};
