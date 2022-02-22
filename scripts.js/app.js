// Dom Elements
const scoreDisplay = document.querySelector('.score-display');
const grid = document.querySelector('.game-grid');
const cells = [];
// Grid Variables
const gameGridWidth = 18;
const cellCount = gameGridWidth * gameGridWidth;
const portalLeft = [144];
const portalRight = [161];
const penWalls = [134, 135, 152, 153];
const star = [19, 304];
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

// Score Variables
let score = 0;

// Charcter Variables
let pacManPosition = 154;
let ghostPosition = 81;
// const ghost2Position = 152;
const pacManFacing = document.getElementById('.pacMan');
const pacmanStart = [pacManPosition];

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
  switch (event.keyCode) {
    case 39:
      if (
        !wallCollide(pacManPosition + 1) &&
        !penWallCollide(pacManPosition + 1)
      )
        pacManPosition++;
      // SHIFT TO RIGHT SIDE
      if (pacManPosition === 161) {
        removePacman(pacManPosition);
        pacManPosition = 144;
        addPacman(pacManPosition);
      }
      break;
    case 37:
      // pacManFacing.style.transform = 'scaleX(-1)';
      if (
        !wallCollide(pacManPosition - 1) &&
        !penWallCollide(pacManPosition - 1)
      )
        pacManPosition--;
      // SHIFT TO LEFT SIDE
      if (pacManPosition === 144) {
        removePacman(pacManPosition);
        pacManPosition = 161;
        addPacman(pacManPosition);
      }

      break;
    case 38:
      if (
        !wallCollide(pacManPosition - gameGridWidth) &&
        !penWallCollide(pacManPosition - gameGridWidth)
      )
        pacManPosition -= gameGridWidth;
      break;
    case 40:
      if (
        !wallCollide(pacManPosition + gameGridWidth) &&
        !penWallCollide(pacManPosition + gameGridWidth)
      )
        pacManPosition += gameGridWidth;
      break;
    default:
      console.log('invalid key pressed ... no cheat codes in this game!');
  }

  addPacman(pacManPosition);
  foodEaten();
  starEaten();
  gameStatusCheck();
}

// Game Over Funtion
function gameStatusCheck() {
  if (pacManPosition === ghostPosition) {
    window.alert(`Game Over! You secured ${score} points`);
  } else if (star.length === 0) {
    window.alert(`Wahooo! You secured ${score} points`);
  }
}

// Food Eating
function foodEaten() {
  if (cells[pacManPosition].classList.contains('food')) {
    score += 10;
    scoreDisplay.innerHTML = score;
    cells[pacManPosition].classList.remove('food');
  }
}

function starEaten() {
  if (cells[pacManPosition].classList.contains('star')) {
    score += 50;
    scoreDisplay.innerHTML = score;
    cells[pacManPosition].classList.remove('star');
    star.pop();
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

// class Ghost {
//   constructor() {
//     'name',
//     'speed',
//     'starting cell',
//     'starting time',
//     'targetArea',
//     'scaredmode';
//   }
// }

// = new Ghost('red', 500, 134, 5, 'all', false);

// Key Push event listener
document.addEventListener('keydown', handleKeyDown);

// Functions to be executes at Game Start.
createGameGrid();
addPacman();
addGhost();

setInterval(startGhostHunt, 400);
// setInterval(startGhost2Hunt, 500);
