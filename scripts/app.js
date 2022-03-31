// Dom Elements
const startScreen = document.querySelector('.start-screen');
const gameoverScreen = document.querySelector('.gameover-screen');
// const youwin = document.querySelector('.you-win');
const scoreDisplay = document.querySelector('.score-grid');
const scoreDisplayEnd = document.querySelector('.score-grid-end');
const startButton = document.querySelector('#start');
// const livesDisplay = document.querySelector('.lives');
const soundButton = document.querySelector('.sound-button');
const lightsButton = document.querySelector('.lightsoff-button');
const restartButton = document.querySelector('.restart-button');
const easteregg1 = document.querySelector('.easter-egg1');
const easteregg2 = document.querySelector('.easter-egg2');
const grid = document.querySelector('.game-grid');
const lightsofflevel = document.querySelector('.lights-off-control');
const lightoffOverlay = document.querySelector('.lightsoffoverlay');
const gridwrapper = document.querySelector('.grid-wrapper');
const title = document.querySelector('.pacMan-title');
// const foodcheck = document.getElementsByTagName('div');
startScreen.onload = startScreen.style.display = 'block';

const cells = [];
// Grid Variables
const gameGridWidth = 18;
const cellCount = gameGridWidth * gameGridWidth;
const portalLeft = [144];
const portalRight = [161];
const penWalls = [134, 135, 152, 153];
let star = [19, 304];
const starRestore = [19, 304];
// eslint-disable-next-line prefer-const
let torch = [289];
const torchRestore = [289];
const walls = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  //
  18, 26, 27, 35,
  //
  36, 38, 39, 40, 41, 42, 44, 45, 47, 48, 49, 50, 51, 53,
  //
  54, 56, 57, 58, 59, 60, 62, 63, 65, 66, 67, 68, 69, 71,
  //
  72, 89,
  //
  90, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107,
  //
  108, 114, 119, 125,
  //
  126, 127, 128, 129, 130, 132, 137, 139, 140, 141, 142, 143,

  //
  162, 163, 164, 165, 166, 168, 173, 175, 176, 177, 178, 179,
  //
  180, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 193, 194, 195, 196,
  197,
  //
  198, 206, 207, 215,
  //
  216, 218, 219, 220, 222, 224, 225, 227, 229, 230, 231, 233,
  //
  234, 236, 237, 238, 240, 245, 247, 248, 249, 251,
  //
  252, 258, 259, 260, 261, 262, 263, 269,
  //
  270, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285,
  287,
  //
  288, 305,
  //
  306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320,
  321, 322, 323,
];

const cellswithfood = [
  20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 33, 34,
  //
  37, 43, 46, 52,
  //
  55, 61, 64, 70,
  //
  73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
  //
  91, 106,
  //
  109, 110, 111, 112, 113, 115, 116, 117, 118, 120, 121, 122, 123, 124,
  //
  131, 133, 136, 138,
  //
  145, 146, 147, 148, 149, 150, 151, 154, 155, 156, 157, 158, 159, 160,
  //
  171, 172, 185, 192,
  //
  199, 200, 201, 202, 203, 204, 205, 208, 209, 210, 211, 212, 213, 214,
  //
  217, 221, 223, 226, 228, 232,
  //
  253, 254, 255, 256, 257, 264, 265, 266, 267, 268,
  //
  271, 286,
  //
  290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304,
  //
];
// Score Variables
let score = 0;
const lives = 2;
// Charcter Variables
let pacManPosition = 170;
let ghostPosition = 81;
// const ghost2Position = 152;
// const pacManFacing = document.getElementById('.pacMan');
const pacmanStart = [pacManPosition];

// lightsoutcreator
const cells2 = [];
const grid2 = document.querySelector('.lightsofflevel');
function createGameGrid2() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-id', i);
    if (penWalls.includes(i)) cell.classList.add('pen-wall');
    if (walls.includes(i)) cell.classList.add('wall', 'wallight');
    cell.textContent = i;
    // cell.classList.add('lightsout');
    cells2.push(cell);
    grid2.appendChild(cell);
  }
}
createGameGrid2();
let lightposition = 170;

function addLight() {
  cells2[lightposition + 1].classList.add('light');
  cells2[lightposition + 1].style.zIndex = '2';
  cells2[lightposition - 1].style.zIndex = '2';
  cells2[lightposition + gameGridWidth].style.zIndex = '2';
  cells2[lightposition - gameGridWidth].style.zIndex = '2';
  cells2[lightposition + gameGridWidth + 1].style.zIndex = '2';
  cells2[lightposition - gameGridWidth + 1].style.zIndex = '2';
  cells2[lightposition + gameGridWidth - 1].style.zIndex = '2';
  cells2[lightposition - gameGridWidth - 1].style.zIndex = '2';
  cells[lightposition + 1].classList.add('light');
  cells[lightposition + 1].style.zIndex = '2';
  cells[lightposition - 1].style.zIndex = '2';
  cells[lightposition + gameGridWidth].style.zIndex = '2';
  cells[lightposition - gameGridWidth].style.zIndex = '2';
  cells[lightposition + gameGridWidth + 1].style.zIndex = '2';
  cells[lightposition - gameGridWidth + 1].style.zIndex = '2';
  cells[lightposition + gameGridWidth - 1].style.zIndex = '2';
  cells[lightposition - gameGridWidth - 1].style.zIndex = '2';
  cells[lightposition].style.zIndex = '2';
}

function removeLight() {
  cells2[lightposition + 1].classList.remove('light');
  cells2[lightposition + 1].style.zIndex = '0';
  cells2[lightposition - 1].style.zIndex = '0';
  cells2[lightposition + gameGridWidth].style.zIndex = '0';
  cells2[lightposition - gameGridWidth].style.zIndex = '0';
  cells2[lightposition + gameGridWidth + 1].style.zIndex = '0';
  cells2[lightposition - gameGridWidth + 1].style.zIndex = '0';
  cells2[lightposition + gameGridWidth - 1].style.zIndex = '0';
  cells2[lightposition - gameGridWidth - 1].style.zIndex = '0';
  cells[lightposition + 1].classList.remove('light');
  cells[lightposition + 1].style.zIndex = '0';
  cells[lightposition - 1].style.zIndex = '0';
  cells[lightposition + gameGridWidth].style.zIndex = '0';
  cells[lightposition - gameGridWidth].style.zIndex = '0';
  cells[lightposition + gameGridWidth + 1].style.zIndex = '0';
  cells[lightposition - gameGridWidth + 1].style.zIndex = '0';
  cells[lightposition + gameGridWidth - 1].style.zIndex = '0';
  cells[lightposition - gameGridWidth - 1].style.zIndex = '0';
  cells[lightposition].style.zIndex = '0';
}

// Core Game Functions
function createGameGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-id', i);
    if (penWalls.includes(i)) {
      cell.classList.add('pen-wall');
    } else if (walls.includes(i)) {
      cell.classList.add('wall');
    } else if (portalLeft.includes(i)) {
      cell.classList.add('portalLeft');
    } else if (portalRight.includes(i)) {
      cell.classList.add('portalRight');
    } else if (pacmanStart.includes(i)) {
      cell.classList.add('start');
    } else if (star.includes(i)) {
      cell.classList.add('star');
    } else if (torch.includes(i)) {
      cell.classList.add('torch');
    } else {
      cell.classList.add('food');
    }
    cell.textContent = i;
    cells.push(cell);
    grid.appendChild(cell);
  }
}

// Pacman + Ghost Functions
function addPacman() {
  cells[pacManPosition].classList.add('pacMan');
}

function removePacman() {
  cells[pacManPosition].classList.remove('pacMan');
}

function addGhost() {
  cells[ghostPosition].classList.add('ghost');
}

function removeGhost() {
  cells[ghostPosition].classList.remove('ghost');
}
// function addGhost2() {
//   cells[ghost2Position].classList.add('ghost2');
// }

// function removeGhost2() {
//   cells[ghost2Position].classList.remove('ghost2');
// }

// Wall Block Function
function wallCollide(directionMoved) {
  return walls.includes(directionMoved);
}

function penWallCollide(directionMoved) {
  return penWalls.includes(directionMoved);
}

// Function to move Pacman
function handleKeyDown(event) {
  removePacman(pacManPosition);
  removeLight();
  switch (event.keyCode) {
    case 39:
      if (
        !wallCollide(pacManPosition + 1) &&
        !penWallCollide(pacManPosition + 1)
      )
        pacManPosition++;
      if (!wallCollide(lightposition + 1) && !penWallCollide(lightposition + 1))
        lightposition++;
      // lightsOffMode();
      // SHIFT TO RIGHT SIDE
      if (pacManPosition === 161) {
        removePacman(pacManPosition);
        pacManPosition = 144;
        addPacman(pacManPosition);
        audio.pipe.play();
      }
      if (lightposition === 161) {
        removeLight(lightposition);
        lightposition = 144;
        addLight(lightposition);
      }
      break;
    case 37:
      // pacManFacing.style.transform = 'scaleX(-1)';
      if (
        !wallCollide(pacManPosition - 1) &&
        !penWallCollide(pacManPosition - 1)
      )
        pacManPosition--;
      if (!wallCollide(lightposition - 1) && !penWallCollide(lightposition - 1))
        lightposition--;

      // SHIFT TO LEFT SIDE
      if (pacManPosition === 144) {
        removePacman(pacManPosition);
        pacManPosition = 161;
        addPacman(pacManPosition);
        audio.pipe.play();
      }
      if (lightposition === 144) {
        removePacman(lightposition);
        lightposition = 161;
        addLight(lightposition);
      }
      break;
    case 38:
      if (
        !wallCollide(pacManPosition - gameGridWidth) &&
        !penWallCollide(pacManPosition - gameGridWidth)
      )
        pacManPosition -= gameGridWidth;
      if (
        !wallCollide(lightposition - gameGridWidth) &&
        !penWallCollide(lightposition - gameGridWidth)
      )
        lightposition -= gameGridWidth;
      break;
    case 40:
      if (
        !wallCollide(pacManPosition + gameGridWidth) &&
        !penWallCollide(pacManPosition + gameGridWidth)
      )
        pacManPosition += gameGridWidth;
      if (
        !wallCollide(lightposition + gameGridWidth) &&
        !penWallCollide(lightposition + gameGridWidth)
      )
        lightposition += gameGridWidth;
      break;
    default:
      console.log('invalid key pressed ... no cheat codes in this game!');
  }

  addPacman(pacManPosition);
  addLight();
  foodEaten();
  starEaten();
  torchGrabbed();
  gameStatusCheck();
}

// Game Over Funtion
function gameStatusCheck() {
  lives.innerHTML = `${lives}`;
  if (pacManPosition === ghostPosition) {
    audio.boo.play();
    gameoverScreen.style.display = 'block';
    document.removeEventListener('keydown', handleKeyDown);
    audio.lostgame.play();
    audio.game.pause();
    scoreDisplay.style.display = 'none';
    scoreDisplayEnd.innerHTML = `GAMEOVER </br><p></p></br> MARIO COLLECTED: </br><p></p></br> ${score} COINS`;
    lightsButton.style.display = 'none';
    audio.lightsout.pause();
    audio.herewego.pause();
    // gameStatusCheck();
    removeLight();
  } else if (star.length === 0 && torch.length === 0) {
    removeGhost(ghostPosition);
    ghostPosition = 81;
    addGhost(ghostPosition);
    audio.game.pause();
    audio.gamewon.loop = false;
    gameoverScreen.style.display = 'block';
    document.removeEventListener('keydown', handleKeyDown);
    scoreDisplay.style.display = 'none';
    scoreDisplayEnd.innerHTML = `MARIO COLLECTED: </br><p></p></br> ${score} COINS </br><p></p></br></br><p></p></br> BONUS LEVEL UNLOCKED! `;
    lightsButton.style.display = 'block';
    audio.gamewon.play();
    removeLight();
  }
}

// Food Eating
function foodEaten() {
  if (cells[pacManPosition].classList.contains('food')) {
    score += 1;
    scoreDisplay.innerHTML = score;
    cells[pacManPosition].classList.remove('food');
    cells[pacManPosition].classList.add('nofood');
  }
}

function starEaten() {
  if (cells[pacManPosition].classList.contains('star')) {
    // score += 100;
    scoreDisplay.innerHTML = score;
    cells[pacManPosition].classList.remove('star');
    cells[pacManPosition].classList.add('nostar');
    star.pop();
  }
}

function torchGrabbed() {
  if (cells[pacManPosition].classList.contains('torch')) {
    scoreDisplay.innerHTML = score;
    cells[pacManPosition].classList.remove('torch');
    cells[pacManPosition].classList.add('notorch');
    torch.pop();
  }
}

function startGhostHunt() {
  gameStatusCheck();
  const pacManXCoordinate = pacManPosition % gameGridWidth;
  const pacManYCoordinate = Math.floor(pacManPosition / gameGridWidth);
  const ghostXCoordinate = ghostPosition % gameGridWidth;
  const ghostYCoordinate = Math.floor(ghostPosition / gameGridWidth);
  const directions = [-1, +1, gameGridWidth, -gameGridWidth];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  removeGhost(ghostPosition);
  // First Movement

  if (pacManXCoordinate > ghostXCoordinate && !wallCollide(ghostPosition + 1)) {
    ghostPosition++;
    addGhost(ghostPosition);
  }
  // second Movement
  else if (
    pacManXCoordinate < ghostXCoordinate &&
    !wallCollide(ghostPosition - 1)
  ) {
    ghostPosition--;
    addGhost(ghostPosition);
  }
  // Third Movement
  else if (
    pacManYCoordinate < ghostYCoordinate &&
    !wallCollide(ghostPosition - gameGridWidth)
  ) {
    ghostPosition -= gameGridWidth;
    addGhost(ghostPosition);
  }
  // Fourth Movemet
  else if (
    pacManYCoordinate > ghostYCoordinate &&
    !wallCollide(ghostPosition + gameGridWidth)
  ) {
    ghostPosition += gameGridWidth;
    addGhost(ghostPosition);
  }
  // Escape Function
  else if (!wallCollide(ghostPosition + direction)) {
    ghostPosition += direction;
    addGhost(ghostPosition);
  } else {
    direction = directions[Math.floor(Math.random() * directions.length)];
    console.log('stuck');
    addGhost(ghostPosition);
  }

  console.log('ghost is in this square: ' + ghostPosition);
}

// Functions to be executes at Game Start.
function gameStart() {
  audio.game.loop = true;
  startScreen.style.display = 'none';
  createGameGrid();
  addPacman();
  addGhost();
  document.addEventListener('keydown', handleKeyDown);
  setInterval(startGhostHunt, 400);
  audio.game.play();

  // setInterval(gameStatusCheck(), 200);
  // setInterval(startGhost2Hunt, 500);
}

function clickHandler() {
  gameStart();
  audio.start.play();
}

function clickHandler2() {
  for (const i in audio) {
    audio[i].muted = !audio[i].muted;
    change();
  }
}

function clickHandler3() {
  audio.egg1.play();
}

function clickHandler4() {
  audio.egg2.play();
}

function clickHandler5() {
  gameoverScreen.style.display = 'none';
  audio.start.play();
  resetAllVariables();
}

function clickHandler6() {
  audio.start.pause();
  gameoverScreen.style.display = 'none';
  audio.lightsout.loop = true;
  audio.lightsout.play();
  audio.herewego.play();
  audio.boo.play();
  resetVariablesLightsOut();
}

function resetAllVariables() {
  scoreDisplay.style.display = 'block';
  scoreDisplay.innerHTML = '0';
  score = 0;
  star = 304;
  removeGhost(ghostPosition);
  removePacman(pacManPosition);
  pacManPosition = 170;
  ghostPosition = 81;
  addGhost(ghostPosition);
  addPacman(pacManPosition);
  document.addEventListener('keydown', handleKeyDown);
  audio.game.play();
  lightsButton.style.display = 'none';
  audio.gamewon.pause();
  audio.boo.pause();
  audio.lostgame.pause();
  lightsofflevel.style.display = 'none';
  lightoffOverlay.style.display = 'none';
  gridwrapper.style.backgroundImage = './images/8BitBackground.jpg';
  lightsButton.style.display = 'none';
  restoregrid();
  restorestars();
  restoretorch();
  popstars();
  poptorch();
  star.push(19, 304);
  torch.push(289);
}

function restoregrid() {
  // const nofoodclass = document.querySelectorAll('.nofood');
  // console.log(nofoodclass);
  cellswithfood.forEach(
    (cell) => {
      // if (cell.classList.contains('nofood'));
      // {
      // console.log('wall');
      // console.log(cell);
      cells[cell].classList.add('food');
      cells[cell].classList.remove('nofood');
    }
    // console.log(cell);
    // if (cells[cell].classList.contains('nofood'));
    // {
    //   cells[cell].classList.remove('nofood');
    //   cells[cell].classList.add('food');
    //
  );
}

function restorestars() {
  starRestore.forEach((cell) => {
    cells[cell].classList.add('star');
    cells[cell].classList.remove('nostar');
    cells.push(19, 304);
  });
}

function restoretorch() {
  torchRestore.forEach((cell) => {
    cells[cell].classList.add('torch');
    cells[cell].classList.remove('notorch');
    cells.push(289);
  });
}

function popstars() {
  star.forEach((cell) => {
    cells[cell].push(19, 304);
  });
}

function poptorch() {
  star.forEach((cell) => {
    cells[cell].push(289);
  });
}

// function popStar() {
// starRestore.forEach((cell) => {
// if (cells[cell].classlist.contains('nostar')) {
//   star.push();
// };
// })

function resetVariablesLightsOut() {
  scoreDisplay.style.display = 'block';
  scoreDisplay.innerHTML = '0';
  star = 304;
  removeGhost(ghostPosition);
  removePacman(pacManPosition);
  pacManPosition = 170;
  const locations = [73, 106, 235, 232];
  ghostPosition = locations[Math.floor(Math.random() * locations.length)];
  addGhost(ghostPosition);
  addPacman(pacManPosition);
  lightposition = 170;
  addLight();
  document.addEventListener('keydown', handleKeyDown);
  lightsButton.style.display = 'none';
  audio.gamewon.pause();
  lightsofflevel.style.display = 'block';
  lightoffOverlay.style.display = 'block';
  gridwrapper.style.backgroundImage = 'none';
  soundButton.style.zIndex = '-1';
  easteregg1.style.zIndex = '-1';
  easteregg2.style.zIndex = '-1';
  title.style.style.zIndex = '-1';
  restorestars();
  restoretorch();
  popstars();
  poptorch();
}

function change() {
  console.log('test');
  const img1 = './images/soundoff!.png',
    img2 = './images/soundoff!.png';
  const imgElement = soundButton;

  imgElement.src = imgElement.src === img1 ? img2 : img1;
}

startButton.addEventListener('click', clickHandler);
restartButton.addEventListener('click', clickHandler5);
soundButton.addEventListener('click', clickHandler2);
easteregg1.addEventListener('click', clickHandler3);
easteregg2.addEventListener('click', clickHandler4);
lightsButton.addEventListener('click', clickHandler6);

const audio = {
  start: new Audio('./sounds/start_letsago.wav'),
  game: new Audio('./sounds/marioUpbeat.mp3'),
  pipe: new Audio('./sounds/pipe.mp3'),
  lostlife: new Audio('./sounds/life-lost.mp3'),
  lostgame: new Audio('/./sounds/smb_gameover.wav'),
  gamewon: new Audio('./sounds/level-clear.mp3'),
  egg1: new Audio('./sounds/easter-egg1.mp3'),
  egg2: new Audio('./sounds/easter-egg2.mp3'),
  lightsout: new Audio('./sounds/lightsoutsound.mp3'),
  boo: new Audio('./sounds/boo.wav'),
  herewego: new Audio('./sounds/herewego.mp3'),
};
