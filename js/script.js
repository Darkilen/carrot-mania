/* CANVAS */
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let W = canvas.width;
let H = canvas.height;









/* ASSETS */
let mainTitleImg = new Image();
mainTitleImg.src = 'assets/main-title.png';

let bgGameImg = new Image();
bgGameImg.src = 'assets/bg-game.png';

let carrotImg = new Image();
carrotImg.src = 'assets/carrot.png';

let ladderImg = new Image();
ladderImg.src = 'assets/ladder.png';

let ground1Img = new Image();
ground1Img.src = 'assets/ground-1.png';

let ground2Img = new Image();
ground2Img.src = 'assets/ground-2.png';

let rabbitLeft = new Image();
rabbitLeft.src = 'assets/rabbitLeft.png';
let rabbitRight = new Image();
rabbitRight.src = 'assets/rabbitRight.png';
let rabbitUp = new Image();
rabbitUp.src = 'assets/rabbitUp.png';
let rabbitDown = new Image();
rabbitDown.src = 'assets/rabbitDown.png';









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
let maxLevelCarrots = currentLevel.carrots.length;

/* function that draws the game level */
function drawGameScreen() {
  drawGameBackground();

  drawGameCarrots();

  drawGameLadders();

  drawRabbit();

  drawGamePlatforms();
}

/* function that draws the game background */
function drawGameBackground() {
  ctx.drawImage(bgGameImg, 0, 0);
}

/* function that draws the game carrots */
function drawGameCarrots() {
  currentLevel.carrots.forEach((carrot) => {
    let x = carrot.x;
    let y = carrot.y;
    ctx.drawImage(carrotImg, x * SQUARESIZE, y * SQUARESIZE);
  });
}

/* function that draws the game ladders */
function drawGameLadders() {
  currentLevel.ladders.forEach((ladder) => {
    let x = ladder.x;
    let y = ladder.y;
    ctx.drawImage(ladderImg, x * SQUARESIZE, y * SQUARESIZE);
  });
}

/* function that draws the game platforms */
function drawGamePlatforms() {
  currentLevel.platforms.forEach((platform) => {
    let x = platform.x;
    let y = platform.y;
    let image = platform.image;
    if (image === "ground-2") {
      ctx.drawImage(ground2Img, x * SQUARESIZE, y * SQUARESIZE);
    } else {
      ctx.drawImage(ground1Img, x * SQUARESIZE, y * SQUARESIZE);
    }
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
  ctx.drawImage(mainTitleImg, -3, 0);
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

/* function that draws the game over screen */
function drawWinGameScreen() {
  canvas.width = 1200;
  ctx.font = '48px Courier New';
  ctx.textAlign = 'Center';
  let text = `You Win !!!`;
  let measure = ctx.measureText(text);
  ctx.fillText(text, W / 2 - measure.width / 2, H / 2);
}

/* function that draws the loose game screen */
function drawLooseGameScreen() {
  canvas.width = 1200;
  ctx.font = '48px Courier New';
  ctx.textAlign = 'Center';
  let text = `You Loose !!!`;
  let measure = ctx.measureText(text);
  ctx.fillText(text, W / 2 - measure.width / 2, H / 2);
}

/* function that draws the game infos */
function drawGameInfos() {
  ctx.font = '15px Courier New';
  let textLevel = `Level : ${currentLevelId}`;
  let textCarrots = `Carrots : ${rabbitCarrots} / ${maxLevelCarrots}`;
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

/* function that change the level variables */
function changeLevel() {
  if (levels[currentLevelId] === undefined) {
    gameState = 'WinGame';
  } else {
    rabbitLives = 3;
    rabbitCarrots = 0;
    currentLevelId++;
    currentLevel = levels[currentLevelId - 1];
    maxLevelCarrots = currentLevel.carrots.length;
    rabbitX = currentLevel.rabbit.x;
    rabbitY = currentLevel.rabbit.y;
    rabbitVX = 0;
    rabbitVY = 0;
    rabbitDirection = 'right';
    gameState = 'LoadingLevel';
  }
}









/* RABBIT*/
let rabbitX = currentLevel.rabbit.x;
let rabbitY = currentLevel.rabbit.y;
let rabbitVX = 0;
let rabbitVY = 0;

let rabbitDirection = 'right'; // 'up', 'down', 'left' or 'right'

let rabbitCanMove = true;
let rabbitLives = 3;
let rabbitCarrots = 0;

/* function that draws the rabbit */
function drawRabbit() {
  switch (rabbitDirection) {
    case 'left':
      ctx.drawImage(rabbitLeft, rabbitX * SQUARESIZE, rabbitY * SQUARESIZE);
      break;
    case 'right':
      ctx.drawImage(rabbitRight, rabbitX * SQUARESIZE, rabbitY * SQUARESIZE);
      break;
    case 'up':
      ctx.drawImage(rabbitUp, rabbitX * SQUARESIZE, rabbitY * SQUARESIZE);
      break;
    case 'down':
      ctx.drawImage(rabbitDown, rabbitX * SQUARESIZE, rabbitY * SQUARESIZE);
      break;
  }
}

/* function that makes move the rabbit */
function moveRabbit() {
  if (!rabbitCanFall()) {
    if (leftPressed && rabbitCanMove && rabbitX > 0 && !thereIsAPlatform(rabbitX - 1, rabbitY)) {
      if (rabbitDirection === 'left') {
        rabbitCanMove = false;
        rabbitVX = -0.05;
        reCanMoveRabbit();
      } else {
        rabbitDirection = 'left';
        rabbitCanMove = false;
        reCanMoveRabbit();
      }
    } else if (rightPressed && rabbitCanMove && rabbitX + 1 < NB_COLS && !thereIsAPlatform(rabbitX + 1, rabbitY)) {
      if (rabbitDirection === 'right') {
        rabbitCanMove = false;
        rabbitVX = 0.05;
        reCanMoveRabbit();
      } else {
        rabbitDirection = 'right';
        rabbitCanMove = false;
        reCanMoveRabbit();
      }
    } else if (upPressed && rabbitCanMove && rabbitY - 1 > 0 && thereIsALadder(rabbitX, rabbitY)) {
      if (rabbitDirection === 'up') {
        rabbitCanMove = false;
        rabbitVY = -0.05;
        reCanMoveRabbit();
      } else {
        rabbitDirection = 'up';
        rabbitCanMove = false;
        reCanMoveRabbit();
      }
    } else if (downPressed && rabbitCanMove && rabbitY + 1 < NB_ROWS && !thereIsAPlatform(rabbitX, rabbitY + 1)) {
      if (rabbitDirection === 'down') {
        rabbitCanMove = false;
        rabbitVY = 0.05;
        reCanMoveRabbit();
      } else {
        rabbitDirection = 'down';
        rabbitCanMove = false;
        reCanMoveRabbit();
      }
    } else if (spacePressed && rabbitCanMove) {
      rabbitDigsAHole(rabbitDirection);
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
  let noLadderBehindRabbit = !thereIsALadder(rabbitX, rabbitY);
  if (rabbitCanMove && noPlatformUnderRabbit && noLadderUnderRabbit && noLadderBehindRabbit && rabbitY + 1 < NB_ROWS) {
    rabbitVY = 0.5;
    return true;
  } else if (rabbitCanMove && (!noPlatformUnderRabbit || !noLadderUnderRabbit || rabbitY + 1 >= NB_ROWS)) {
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
  for (let i = 0; i < currentLevel.carrots.length; i++) {
    if (currentLevel.carrots[i].x === rabbitX && currentLevel.carrots[i].y === rabbitY) {
      rabbitCarrots++;
      let pos = currentLevel.carrots.findIndex((element) => {
        return element.x === rabbitX && element.y === rabbitY;
      });
      currentLevel.carrots.splice(pos, 1);
    }
    if (currentLevel.carrots.length === 0) {
      changeLevel();
    }
  }
}

/* function that making the rabbit digs a hole on the ground */
function rabbitDigsAHole(rabbitDirection) {
  if (rabbitDirection === 'left' && thereIsAPlatform(rabbitX - 1, rabbitY + 1) && !thereIsAPlatform(rabbitX - 1, rabbitY)) {
    rabbitCanMove = false;

    let pos = currentLevel.platforms.findIndex((element) => {
      return element.x === rabbitX - 1 && element.y === rabbitY + 1;
    });
    let platform = currentLevel.platforms[pos];
    currentLevel.platforms.splice(pos, 1);
    let timeOut = setTimeout(function() {
      currentLevel.platforms.push(platform);
      if (platform.x === rabbitX && platform.y === rabbitY) {
        restartLevel();
      }
    }, 7000);

    reCanMoveRabbit();
  } else if (rabbitDirection === 'right' && thereIsAPlatform(rabbitX + 1, rabbitY + 1) && !thereIsAPlatform(rabbitX + 1, rabbitY)) {
    rabbitCanMove = false;

    let pos = currentLevel.platforms.findIndex((element) => {
      return element.x === rabbitX + 1 && element.y === rabbitY + 1;
    });
    let platform = currentLevel.platforms[pos];
    currentLevel.platforms.splice(pos, 1);
    let timeOut = setTimeout(function() {
      currentLevel.platforms.push(platform);
      if (platform.x === rabbitX && platform.y === rabbitY) {
        restartLevel();
      }
    }, 7000);

    reCanMoveRabbit();
  }
}

function restartLevel() {
  rabbitLives--;
  if (rabbitLives === 0) {
    gameState = 'LooseGame';
  } else {
    rabbitX = currentLevel.rabbit.x;
    rabbitY = currentLevel.rabbit.y;
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
  } else if (gameState === 'WinGame') {
    drawWinGameScreen();
  } else if (gameState === 'LooseGame') {
    drawLooseGameScreen();
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