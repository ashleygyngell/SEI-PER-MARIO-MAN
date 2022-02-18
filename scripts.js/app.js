// Dom Elements
const grid = document.querySelector('.game-grid');
const cells = [];

// Charcter Variables
let pacManPosition = 149;
// let ghostPosition = 134;

// Grid Variables
const gameGridWidth = 18;
const cellCount = gameGridWidth * gameGridWidth;
const penWalls = [134, 135, 152, 153];
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
  // 144, 161,
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

// Core Game Functions
function createGameGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-id', i);
    if (penWalls.includes(i)) cell.classList.add('pen-wall');
    if (walls.includes(i)) cell.classList.add('wall');
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
      break;
    case 37:
      if (
        !wallCollide(pacManPosition - 1) &&
        !penWallCollide(pacManPosition - 1)
      )
        pacManPosition--;
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
}

// Function to move Pacman
// function startGhostHunt(event) {
//   removeGhost(ghostPosition);

//   switch (event.keyCode) {
//     case 39:
//       if (!wallCollide(ghostPosition + 1)) ghostPosition++;
//       break;
//     case 37:
//       if (!wallCollide(ghostPosition - 1)) ghostPosition--;
//       break;
//     case 38:
//       if (!wallCollide(ghostPosition - gameGridWidth))
//         ghostPosition -= gameGridWidth;
//       break;
//     case 40:
//       if (!wallCollide(ghostPosition + gameGridWidth))
//         ghostPosition += gameGridWidth;
//       break;
//     default:
//       console.log('invalid key pressed ... no cheat codes in this game!');
//   }
//   addGhost(ghostPosition);
// }

// Key Push event listeners
document.addEventListener('keydown', handleKeyDown);

// Functions to be executes at Game Start.
createGameGrid();
addPacman();
// addGhost();
// startGhostHunt();
// Functions to be executed at set time.

// setTimeout(startGhostHunt(), 1500)

// const pacManXCoordinate = pacManPosition % gameGridWidth;
// const pacManYCoordinate = Math.floor(pacManPosition / gameGridWidth);
