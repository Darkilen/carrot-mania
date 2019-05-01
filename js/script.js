/* CANVAS */
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let W = canvas.width;
let H = canvas.height;







/* GAME */
let GAMEWIDTH = 840;
let GAMEHEIGHT = 680;

let SQUARESIZE = 40;
let NB_ROWS = 17;
let NB_COLS = 21;

/* GameState */
let gameState = 'MainTitle';

/* function that changes the game state */
function changeGameState() {
  if (gameState === 'MainTitle' && enterPressed) {
    gameState = 'LoadingLevel';
  } else if (gameState === 'Game' && pPressed) {
    gameState = 'Pause';
  } else if (gameState === 'Pause' && pPressed) {
    gameState = 'Game';
  }
}

/* currentLevels */
let currentLevelId = 1;
let currentLevel = levels[currentLevelId - 1];

/* function that draws the game level */
function drawLevel() {
  currentLevel.platforms.forEach((platform) => {
    let x = platform.x;
    let y = platform.y;
    ctx.beginPath();
    ctx.fillStyle = "#8E3F03";
    ctx.fillRect((x) * SQUARESIZE, (y) * SQUARESIZE, SQUARESIZE, SQUARESIZE);
    ctx.closePath();
  });
  currentLevel.ladders.forEach((ladder) => {
    let x = ladder.x;
    let y = ladder.y;
    ctx.beginPath();
    ctx.fillStyle = "#DCB000";
    ctx.fillRect((x) * SQUARESIZE, (y) * SQUARESIZE, SQUARESIZE, SQUARESIZE);
    ctx.closePath();
  });
  currentLevel.carrots.forEach((carrot) => {
    let x = carrot.x;
    let y = carrot.y;
    ctx.beginPath();
    ctx.fillStyle = "#FE9301";
    ctx.fillRect((x) * SQUARESIZE, (y) * SQUARESIZE, SQUARESIZE, SQUARESIZE);
    ctx.closePath();
  });
}


/* BUTTONS */
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let enterPressed = false;
let spacePressed = false;
let pPressed = false;

/* event listener that detects when a button is pressed */
document.addEventListener("keydown", () => {
  if (event.key == "Up" || event.key == "ArrowUp") {
    upPressed = true;
  } else if (event.key == "Down" || event.key == "ArrowDown") {
    downPressed = true;
  } else if (event.key == "Left" || event.key == "ArrowLeft") {
    leftPressed = true;
  } else if (event.key == "Right" || event.key == "ArrowRight") {
    rightPressed = true;
  } else if (event.key == "Enter") {
    enterPressed = true;
  } else if (event.key == " " || event.key == "Space") {
    spacePressed = true;
  }
}, false);

/* event listener that detects when a button is released */
document.addEventListener("keyup", function() {
  if (event.key == "Up" || event.key == "ArrowUp") {
    upPressed = false;
  } else if (event.key == "Down" || event.key == "ArrowDown") {
    downPressed = false;
  } else if (event.key == "Left" || event.key == "ArrowLeft") {
    leftPressed = false;
  } else if (event.key == "Right" || event.key == "ArrowRight") {
    rightPressed = false;
  } else if (event.key == "Enter") {
    enterPressed = false;
  } else if (event.key == " " || event.key == "Space") {
    spacePressed = false;
  }
}, false);


/* SCREENS */
/* function that draws the main title screen */
function drawMainTitleScreen() {
  canvas.width = 938;
  let img = new Image();
  img.src = "assets/main-title.png";
  ctx.drawImage(img, -3, 0);
}

/* function that draws the loading level screen */
function drawLoadingLevelScreen() {
  canvas.width = 1200;
  ctx.font = '48px Courier New';
  ctx.textAlign = 'Center';
  let text = `LoadingLevel : ${currentLevelId}`;
  let measure = ctx.measureText(text);
  ctx.fillText(text, W / 2 - measure.width / 2, H / 2);
}

/* function that draws the game screen */
function drawGameScreen() {
  drawLevel();
  drawRabbit();
}

/* function that draws the game infos */
function drawGameInfos() {
  ctx.font = '15px Courier New';
  let textLevel = `Level : ${currentLevelId}`;
  let textCarrots = `Carrots : ${rabbitCarrots} / ${currentLevel.carrots.length - 1}`;
  let textLives = `Lives : ${rabbitLives} / 3`;
  ctx.fillText(textLevel, 900, 100);
  ctx.fillText(textCarrots, 900, 200);
  ctx.fillText(textLives, 900, 300);
}

/*  function that draws the game grid */
function drawGameGrid() {
  for (let i = 0; i < GAMEWIDTH; i += SQUARESIZE) {
    for (let j = 0; j < GAMEHEIGHT; j += SQUARESIZE) {
      ctx.strokeStyle = "#AAA";
      ctx.strokeRect(i, j, SQUARESIZE, SQUARESIZE);
    }
  }
}








/* RABBIT*/
let rabbitX = currentLevel.rabbit.x;
let rabbitY = currentLevel.rabbit.y;
let rabbitVX = 0;
let rabbitVY = 0;

let rabbitCanMove = true;
let rabbitLives = 3;
let rabbitCarrots = 0;

/* function that draws the rabbit */
function drawRabbit() {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(rabbitX * SQUARESIZE, rabbitY * SQUARESIZE, SQUARESIZE, SQUARESIZE);
  ctx.closePath();
}

/* function that makes move the rabbit */
function moveRabbit() {
  if (!rabbitCanFall()) {
    if (leftPressed && rabbitCanMove && rabbitX > 0 && !thereIsAPlatform(rabbitX - 1, rabbitY)) {
      rabbitCanMove = false;
      rabbitVX = -0.05;
      reCanMoveRabbit();
    } else if (rightPressed && rabbitCanMove && rabbitX + 1 < NB_COLS && !thereIsAPlatform(rabbitX + 1, rabbitY)) {
      rabbitCanMove = false;
      rabbitVX = 0.05;
      reCanMoveRabbit();
    } else if (upPressed && rabbitCanMove && rabbitY - 1 > 0 && thereIsALadder(rabbitX, rabbitY)) {
      rabbitCanMove = false;
      rabbitVY = -0.05;
      reCanMoveRabbit();
    } else if (downPressed && rabbitCanMove && rabbitY + 1 < NB_ROWS && thereIsALadder(rabbitX, rabbitY + 1)) {
      rabbitCanMove = false;
      rabbitVY = 0.05;
      reCanMoveRabbit();
    }
  }
  changePosRabbit();
}

/* function that re authorizes the player to making move the rabbit with the arrow keys */
function reCanMoveRabbit() {
  let timeOut = window.setTimeout(() => {
    rabbitVX = 0;
    rabbitVY = 0;
    rabbitCanMove = true;
    rabbitX = Math.round(rabbitX);
    rabbitY = Math.round(rabbitY);
  }, 300);
}

/* function that makes fall the rabbit */
function rabbitCanFall() {
  let noPlatformUnderRabbit = !thereIsAPlatform(rabbitX, rabbitY + 1);
  let noLadderUnderRabbit = !thereIsALadder(rabbitX, rabbitY + 1);
  if (rabbitCanMove && noPlatformUnderRabbit && noLadderUnderRabbit) {
    rabbitVY = 0.5;
    return true;
  } else if (rabbitCanMove && (!noPlatformUnderRabbit || !noLadderUnderRabbit)) {
    rabbitVY = 0;
    return false;
  }
}

/* function that changes the position of the rabbit */
function changePosRabbit() {
  rabbitX += rabbitVX;
  rabbitY += rabbitVY;
}

/* function that returns true if there is a platform, false if not */
function thereIsAPlatform(x, y) {
  for (let i = 0; i < currentLevel.platforms.length; i++) {
    if (currentLevel.platforms[i].x === x && currentLevel.platforms[i].y === y) {
      return true;
    }
  }
  return false;
}

/* function that returns true if there is a ladder, false if not */
function thereIsALadder(x, y) {
  for (let i = 0; i < currentLevel.ladders.length; i++) {
    if (currentLevel.ladders[i].x === x && currentLevel.ladders[i].y === y) {
      return true;
    }
  }
  return false;
}

/* function that making the rabbit eat the carrot */
function rabbitEatCarrot() {
  let a = currentLevel.carrots;

  for (let i = 0; i < a.length; i++) {
    if (a[i].x === rabbitX && a[i].y === rabbitY) {
      console.log("MANGE !");
    }
  }
}









/* INIT, UPDATE AND ANIMATE */
/* function that initialises the game */
function init() {
  drawMainTitleScreen();
}

/* function that updates the game */
function update() {
  changeGameState();

  if (gameState === 'MainTitle') {
    drawMainTitleScreen();
  } else if (gameState === 'LoadingLevel') {
    drawLoadingLevelScreen();
    let timeOut = window.setTimeout(() => {
      gameState = 'Game';
    }, 700);
  } else if (gameState === 'Game') {
    rabbitEatCarrot();
    moveRabbit();
    drawGameScreen();
    drawGameInfos();
  } else if (gameState === 'GameOver') {
    drawGameOverScreen();
  }
}

/* function that animate the game */
function animate() {
  ctx.clearRect(0, 0, W, H);
  update();
  requestAnimationFrame(animate);
}









/* LAUNCH THE GAME */
init();
animate();