import { Matrix } from './matrix-builder.js';
import { waterAreaCalculator } from './water-area-calculator.js';
import { sleep } from './utilities.js';

const matrix = new Matrix();

const speedOptions = document.getElementById("speed-field").querySelectorAll("input");
const playBtn = document.getElementById("play-button");
const renewBtn = document.getElementById("renew-button");
const waterCounter = document.getElementById("counter");

let isReadyToPlay = true;
let traverseSpeed = 10;
let isTraversing = false;

for (let i = 0; i < matrix.domAccesMatrixCells.length; i++) {
    for (let j = 0; j < matrix.domAccesMatrixCells[i].length; j++) {
        matrix.domAccesMatrixCells[i][j].addEventListener('click', async function() {
            if (matrix.isTraversed) {
                windowRenew(true);
            }
            let row = i;
            if (!(matrix.domAccesMatrixCells[row][j].classList.contains("blocked-cell"))) {
                setTraverseStatus(true);
                matrix.domAccesMatrixCells[row][j].classList.add("blocked-cell");
                while (!(matrix.domAccesMatrixCells[row + 1][j].classList.contains("blocked-cell"))) {
                    row++;
                    await addClass(matrix.domAccesMatrixCells[row][j], "blocked-cell", 55);
                }
                setTraverseStatus(false);
            }
        });
    }
}

for (let i = 0; i < speedOptions.length; i++) {
    speedOptions[i].addEventListener('change', () => speedOptionEvent(i));
}

playBtn.addEventListener('click', async function() {
    if (isReadyToPlay) {
        if (matrix.isTraversed) windowRenew(true);
        setTraverseStatus(true);
        await waterAreaCalculator(matrix.domAccesMatrixCells, 
            matrix.auxiliarMatrixAcces, waterCounter, traverseSpeed);
        matrix.isTraversed = true;
        setTraverseStatus(false);
    }
});


renewBtn.addEventListener('click', () => {
    if (matrix.isTraversed) {
        windowRenew();
    }
});

function windowRenew(isWaterRemove=false) {
    if (!(isTraversing)) {
        matrix.renew(isWaterRemove);
        waterCounter.textContent = "0";
    }
}

function setTraverseStatus(status) {
    isTraversing = status;
    if (status === false) {
        renewBtn.classList.remove("selected");
        setPlayStatus(true);
    } else {
        renewBtn.classList.add("selected");
        setPlayStatus(false);
    }
}

function setPlayStatus(status) {
    isReadyToPlay = status;
    if (status === false) {
        playBtn.classList.add("selected");
    } else {
        playBtn.classList.remove("selected");
    }
}

function speedOptionEvent(idx) {
    if (idx === 0) {
        traverseSpeed = 0;
    } else if (idx === 1) {
        traverseSpeed = 10;
    } else {
        traverseSpeed = 50;
    }
}

async function addClass(element, className, waitTime=0) {
    await sleep(waitTime);
    element.classList.add(className);
}



