import * as utilities from './utilities.js';

export async function waterAreaCalculator(matrix, auxiliarMatrix, waterCounter, waitTime=75) {
    let leftColIdx = 0;
    let rightColIdx = matrix[0].length - 1;
    let maxLeftHeight = await getHeight(leftColIdx, -Infinity,
        matrix, auxiliarMatrix, waterCounter, waitTime);
    let maxRightHeight = await getHeight(rightColIdx, -Infinity,
        matrix, auxiliarMatrix, waterCounter, waitTime);
    while (leftColIdx < rightColIdx) {
        if (maxLeftHeight < maxRightHeight) {
            leftColIdx++;
            pointCol(leftColIdx, leftColIdx - 1, auxiliarMatrix);
            maxLeftHeight = await getHeight(leftColIdx, maxLeftHeight,
                matrix, auxiliarMatrix, waterCounter, waitTime);
        } else {
            rightColIdx--;
            pointCol(rightColIdx, rightColIdx + 1, auxiliarMatrix);
            maxRightHeight = await getHeight(rightColIdx, maxRightHeight,
                matrix, auxiliarMatrix, waterCounter, waitTime);
        }
    }
}

async function getHeight(col, pastHeight, matrix, auxiliarMatrix, waterCounter, waitTime) {
    let row = 0;
    let currentHeight = matrix.length - 1;
    let currentWater = 0;
    updateHeightParameter(col, auxiliarMatrix, currentHeight);
    updateWaterParameter(col, auxiliarMatrix, currentWater);
    while (!(matrix[row][col].classList.contains("blocked-cell"))) {
        currentHeight--;
        updateHeightParameter(col, auxiliarMatrix, currentHeight);
        await pointCell(matrix[row][col], waitTime);
        if (currentHeight < pastHeight) {
            currentWater++;
            utilities.addClass(matrix[row][col], ["water"]);
            updateWaterParameter(col, auxiliarMatrix, currentWater, waterCounter);
        }
        row++;
    }
    return Math.max(currentHeight, pastHeight);
}

async function pointCell(cell, waitTime) {
    await utilities.sleep(waitTime);
    utilities.addClass(cell, ["pointed"]);
}

function updateHeightParameter(col, auxiliarMatrix, currentHeight) {
    const node = auxiliarMatrix[1][col];
    node.firstChild.textContent = String(currentHeight);
}

function updateWaterParameter(col, auxiliarMatrix, currentWater, waterCounter=null) {
    const node = auxiliarMatrix[2][col];
    node.firstChild.textContent = String(currentWater);
    if (waterCounter) {
        sumOneWater(waterCounter);
    }
}

function sumOneWater(waterCounter) {
    const currentWaterCount = parseInt(waterCounter.textContent);
    waterCounter.textContent = String(currentWaterCount + 1);
}

function pointCol(col, pastCol, auxiliarMatrix) {
    utilities.removeClass(auxiliarMatrix[0][pastCol].firstChild, ["fas", "fa-chevron-up"]);
    utilities.addClass(auxiliarMatrix[0][col].firstChild, ["fas", "fa-chevron-up"]);
}
