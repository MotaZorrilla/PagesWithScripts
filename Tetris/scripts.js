let gameOver = false;
// help
const modalLevels = document.getElementById("selectLevel");
const closeLevelsButton = document.getElementById("closeLevels");
const modalQuestions = document.getElementById("questionsDialog");
const closeQuestionsButton = document.getElementById("closeQuestions");

modalLevels.showModal();

document.getElementById("imageModalLevels").addEventListener("click", () => {
    modalLevels.showModal();
});
closeLevelsButton.addEventListener("click", function () {
    modalLevels.close();
});

// Lógica para seleccionar el nivel y ajustar el intervalo
let speed = 0;
let lives = 3; // Inicializar el número de vidas
let score = 0;
let level = 1;
let levelEasy = document.getElementById("buttomEasy");
let levelNormal = document.getElementById("buttomNormal")
let levelHard = document.getElementById("buttomHard")
let isEasyMode = false;

levelEasy.addEventListener('click', () => {
    speed = 700;
    isEasyMode = true;
    modalLevels.close();
    setInterval(moveTetromino, speed);
});

levelNormal.addEventListener('click', () => {
    speed = 500;
    modalLevels.close();
    setInterval(moveTetromino, speed);
});

levelHard.addEventListener('click', () => {
    speed = 100;
    modalLevels.close();
    console.log('dificil');
    setInterval(moveTetromino, speed);
});

document.getElementById("imageModalQuestions").addEventListener("click", () => {
    modalQuestions.showModal();
});
closeQuestionsButton.addEventListener("click", function () {
    modalQuestions.close();
});

// game Over
const modalGameOver = document.getElementById("gameOverDialog");
const closeGameOverButton = document.getElementById("closeGameOver");
const reset = document.getElementById("reset");

closeGameOverButton.addEventListener("click", function () {
    modalGameOver.close();
});

reset.addEventListener("click", function () {
    location.reload();
    modalGameOver.close();
});

// sounds
const bgm = document.createElement("audio");
const breakSound = document.createElement("audio");
const drop = document.createElement("audio");
const lose = document.createElement("audio");
const sound = document.querySelector(".muted");

lose.setAttribute("src", "./assets/sounds/sadTrombone.mp3");
lose.muted = true;

bgm.setAttribute("src", "./assets/sounds/tetris.mp3");
// bgm.muted = true;
bgm.play();
bgm.setAttribute("loop", true);

breakSound.setAttribute("src", "./assets/sounds/Whoosh.mp3");
breakSound.muted = true;

drop.setAttribute("src", "./assets/sounds/drop.mp3");
drop.muted = true;

// sound init
sound.addEventListener("click", () => {
    if (bgm.muted) {
        bgm.play();
        bgm.muted = false;
        drop.muted = false;
    } else {
        bgm.pause();
        bgm.muted = true;
        drop.muted = true;
    }
});

//Generación de fondo dinámico
let angulo_fondo = Math.random() * 360;
let tono_fondo = Math.random() * 360;
setInterval(() => {
    document.body.style.background = `linear-gradient(
                ${angulo_fondo}deg, 
                hsl(${tono_fondo},100%,50%),
                hsl(${tono_fondo},100%,20%)
            )`
    angulo_fondo += Math.random();
    tono_fondo += Math.random();
}, 100);

// Game board setup
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const board = [];

let rotatedShape;

// init board
for (let row = 0; row < BOARD_HEIGHT; row++) {
    board[row] = [];
    for (let col = 0; col < BOARD_WIDTH; col++) {
        board[row][col] = 0;
    }
}

// Tetrominoes
const tetrominoes = [
    // Tetromino-O
    {
        shape: [
            [1, 1],
            [1, 1],
        ],
        color: "#ff9e0b",
    },
    // Tetromino-T
    {
        shape: [
            [0, 2, 0],
            [2, 2, 2],
        ],
        color: "#f20b33",
    },
    // Tetromino-S
    {
        shape: [
            [0, 3, 3],
            [3, 3, 0],
        ],
        color: "#c01ebb",
    },
    // Tetromino-Z
    {
        shape: [
            [4, 4, 0],
            [0, 4, 4],
        ],
        color: "#238f18",
    },
    // Tetromino-J
    {
        shape: [
            [5, 0, 0],
            [5, 5, 5],
        ],
        color: "#fe5f09",
    },
    // Tetromino-L
    {
        shape: [
            [0, 0, 6],
            [6, 6, 6],
        ],
        color: "#003cbe",
    },
    // Tetromino-I
    {
        shape: [[7, 7, 7, 7]],
        color: "#0098df"
    },
];

// Tetromino randomizer
function randomTetromino() {
    const index = Math.floor(Math.random() * tetrominoes.length);
    const tetromino = tetrominoes[index];
    return {
        shape: tetromino.shape,
        color: tetromino.color,
        row: 0,
        col: Math.floor(Math.random() * (BOARD_WIDTH - tetromino.shape[0].length + 1)),
    };
}

// Current tetromino
let currentTetromino = randomTetromino();
let currentGhostTetromino;

// Draw tetromino
function drawTetromino() {
    const shape = currentTetromino.shape;
    const color = currentTetromino.color;
    const row = currentTetromino.row;
    const col = currentTetromino.col;

    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
                const block = document.createElement("div");
                block.classList.add("block");
                block.style.backgroundColor = color;
                block.style.top = (row + r) * 24 + "px";
                block.style.left = (col + c) * 24 + "px";
                block.setAttribute("id", `block-${row + r}-${col + c}`);
                document.getElementById("game_board").appendChild(block);
            }
        }
    }
}

// Erase tetromino from board
function eraseTetromino() {
    for (let i = 0; i < currentTetromino.shape.length; i++) {
        for (let j = 0; j < currentTetromino.shape[i].length; j++) {
            if (currentTetromino.shape[i][j] !== 0) {
                let row = currentTetromino.row + i;
                let col = currentTetromino.col + j;
                let block = document.getElementById(`block-${row}-${col}`);

                if (block) {
                    document.getElementById("game_board").removeChild(block);
                }
            }
        }
    }
}

// Check if tetromino can move in the specified direction
function canTetrominoMove(rowOffset, colOffset) {
    for (let i = 0; i < currentTetromino.shape.length; i++) {
        for (let j = 0; j < currentTetromino.shape[i].length; j++) {
            if (currentTetromino.shape[i][j] !== 0) {
                let row = currentTetromino.row + i + rowOffset;
                let col = currentTetromino.col + j + colOffset;

                if (row >= BOARD_HEIGHT || col < 0 || col >= BOARD_WIDTH || (row >= 0 && board[row][col] !== 0)) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Check if tetromino can move in the specified direction
function canTetrominoRotate() {
    for (let i = 0; i < rotatedShape.length; i++) {
        for (let j = 0; j < rotatedShape[i].length; j++) {
            if (rotatedShape[i][j] !== 0) {
                let row = currentTetromino.row + i;
                let col = currentTetromino.col + j;

                if (row >= BOARD_HEIGHT || col < 0 || col >= BOARD_WIDTH || (row >= 0 && board[row][col] !== 0)) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Lock the tetromino in place
function lockTetromino() {
    if (!gameOver) {
        console.log(gameOver);
        // Add the tetromino to the board
        for (let i = 0; i < currentTetromino.shape.length; i++) {
            for (let j = 0; j < currentTetromino.shape[i].length; j++) {
                if (currentTetromino.shape[i][j] !== 0) {
                    let row = currentTetromino.row + i;
                    let col = currentTetromino.col + j;
                    board[row][col] = currentTetromino.color;
                }
            }
        }

        // Check if any rows need to be cleared
        let rowsCleared = clearRows();
        if (rowsCleared > 0) {
            score += 10 * rowsCleared;
            document.getElementById("score").innerText = "Score: " + score;

            // Incrementar nivel cada 100 puntos
            if (score % 50 === 0) {
                level++;
                document.getElementById("level").innerText = "Level: " + level;
                // speed /= score*10;
                // console.log(speed, level);
                // clearInterval(interval);
                // setInterval(moveTetromino, speed)
            }
        }

        // Verificar si hay vidas disponibles
        if (lives > 0) {
            // Create a new tetromino
            currentTetromino = randomTetromino();
        } else {
            // Acciones para Game Over
            bgm.muted = true;
            breakSound.muted = true;
            drop.muted = true;
            lose.muted = true;
            sound.muted = true;
            modalGameOver.showModal();
            lose.play();
            lose.muted = false;
            gameOver = true;
            console.log(gameOver);
            return;
        }
    }
}

function clearRows() {
    let rowsCleared = 0;

    // "Elimina la línea completa al examinarla desde abajo."
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        let rowFilled = true;

        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (board[y][x] === 0) {
                rowFilled = false;
                break;
            }
        }

        if (rowFilled) {
            breakSound.muted = false;
            breakSound.play();
            rowsCleared++;

            for (let yy = y; yy > 0; yy--) {
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    board[yy][x] = board[yy - 1][x];
                }
            }

            for (let x = 0; x < BOARD_WIDTH; x++) {
                board[0][x] = 0;
            }
            document.getElementById("game_board").innerHTML = "";
            for (let row = 0; row < BOARD_HEIGHT; row++) {
                for (let col = 0; col < BOARD_WIDTH; col++) {
                    if (board[row][col]) {
                        const block = document.createElement("div");
                        block.classList.add("block");
                        block.style.backgroundColor = board[row][col];
                        block.style.top = row * 24 + "px";
                        block.style.left = col * 24 + "px";
                        block.setAttribute("id", `block-${row}-${col}`);
                        document.getElementById("game_board").appendChild(block);
                    }
                }
            }

            y++;
        }
    }

    return rowsCleared;
}

// Rotate the tetromino
function rotateTetromino() {
    rotatedShape = [];
    for (let i = 0; i < currentTetromino.shape[0].length; i++) {
        let row = [];
        for (let j = currentTetromino.shape.length - 1; j >= 0; j--) {
            row.push(currentTetromino.shape[j][i]);
        }
        rotatedShape.push(row);
    }

    // Check if the rotated tetromino can be placed
    if (canTetrominoRotate()) {
        drop.muted = false;
        drop.play();
        eraseTetromino();
        currentTetromino.shape = rotatedShape;
        drawTetromino();
    }

    moveGhostTetromino();
}

// Move the tetromino
function moveTetromino(direction) {

    let row = currentTetromino.row;
    let col = currentTetromino.col;
    if (direction === "left") {
        if (canTetrominoMove(0, -1)) {
            eraseTetromino();
            col -= 1;
            currentTetromino.col = col;
            currentTetromino.row = row;
            drawTetromino();
        }
    } else if (direction === "right") {
        if (canTetrominoMove(0, 1)) {
            eraseTetromino();
            col += 1;

            currentTetromino.col = col;
            currentTetromino.row = row;
            drawTetromino();
        }
    } else {
        if (canTetrominoMove(1, 0)) {
            eraseTetromino();
            row++;
            currentTetromino.col = col;
            currentTetromino.row = row;
            drawTetromino();
        } else {
            lockTetromino();
        }
    }

    moveGhostTetromino();
}

drawTetromino();
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
    switch (event.keyCode) {
        case 37: // left arrow
            moveTetromino("left");
            break;
        case 39: // right arrow
            moveTetromino("right");
            break;
        case 40: // down arrow
            moveTetromino("down");
            break;
        case 38: // up arrow
            rotateTetromino();
            break;
        case 32: // up arrow
            dropTetromino();
            break;
        default:
            break;
    }
}

function dropTetromino() {
    let row = currentTetromino.row;
    let col = currentTetromino.col;

    drop.muted = false;
    drop.play();

    while (canTetrominoMove(1, 0)) {
        eraseTetromino();
        row++;
        currentTetromino.col = col;
        currentTetromino.row = row;
        drawTetromino();
    }
    lockTetromino();
}

// Draw Ghost tetromino
function drawGhostTetromino() {
    const shape = currentGhostTetromino.shape;
    const color = "rgba(255,255,255,0.05)";
    const row = currentGhostTetromino.row;
    const col = currentGhostTetromino.col;

    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
                const block = document.createElement("div");
                block.classList.add("ghost");
                block.style.backgroundColor = color;
                block.style.top = (row + r) * 24 + "px";
                block.style.left = (col + c) * 24 + "px";
                block.setAttribute("id", `ghost-${row + r}-${col + c}`);
                document.getElementById("game_board").appendChild(block);
            }
        }
    }
}

function eraseGhostTetromino() {
    const ghost = document.querySelectorAll(".ghost");
    for (let i = 0; i < ghost.length; i++) {
        ghost[i].remove();
    }
}

// Check if tetromino can move in the specified direction
function canGhostTetrominoMove(rowOffset, colOffset) {
    for (let i = 0; i < currentGhostTetromino.shape.length; i++) {
        for (let j = 0; j < currentGhostTetromino.shape[i].length; j++) {
            if (currentGhostTetromino.shape[i][j] !== 0) {
                let row = currentGhostTetromino.row + i + rowOffset;
                let col = currentGhostTetromino.col + j + colOffset;

                if (row >= BOARD_HEIGHT || col < 0 || col >= BOARD_WIDTH || (row >= 0 && board[row][col] !== 0)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function moveGhostTetromino() {
    if (isEasyMode) {
        eraseGhostTetromino();

        currentGhostTetromino = { ...currentTetromino };
        while (canGhostTetrominoMove(1, 0)) {
            currentGhostTetromino.row++;
        }

        drawGhostTetromino();
    }
}

function isGameOver() {
    for (let i = 0; i < currentTetromino.shape.length; i++) {
        for (let j = 0; j < currentTetromino.shape[i].length; j++) {
            if (currentTetromino.shape[i][j] !== 0) {
                let row = currentTetromino.row + i;
                if (row <= 0) {
                    return true; // Game Over
                }
            }
        }
    }
    return false; // No Game Over
}

function restartGame() {
    lives = 3;
    score = 0;
    level = 1;
    isEasyMode = false;
    gameOver = false;

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("level").innerText = "Level: " + level;
}
