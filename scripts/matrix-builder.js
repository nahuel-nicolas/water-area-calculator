import * as utilities from './utilities.js';

export class Matrix {
    constructor() {
        this.isTraversed = false;
        this.domMatrix = this.getNewDomMatrix();
        this.width = 0;
        this.height = 0;
        this.domAccesMatrixCells = [];
        this.domAccesMatrixRows = [];
        this.fillUpMatrix();
        this.auxiliarMatrixAcces = this.getAuxiliarMatrixAcces(3, this.width);
    }

    getNewDomMatrix() {
        const matrixContainer = document.getElementById("matrix-container");
        const domMatrix = document.createElement("div");
        domMatrix.setAttribute("class", "matrix");
        matrixContainer.appendChild(domMatrix);

        return domMatrix;
    }

    fillUpMatrix() {
        this.height = 9;
        this.width = 30;
        for (let i = 0; i < this.height; i++) {
            this.buildNewDomRow(this.width, i);
        }
    }

    buildNewDomRow(rowLength, i) {
        const domRow = document.createElement("div");
        domRow.setAttribute("class", "row");
        const domAccesRow = [];

        // Fill up row with cells
        for (let j = 0; j < rowLength; j++) {
            const domCell = this.newDomCell(i);
            domAccesRow.push(domCell);
            domRow.appendChild(domCell);
        }

        this.domAccesMatrixCells.push(domAccesRow);
        this.domAccesMatrixRows.push(domRow);
        this.domMatrix.appendChild(domRow);
        return domRow;
    }

    newDomCell(row, col=null, isAuxiliarCell=false) {
        const domCell = document.createElement("div");
        domCell.setAttribute("class", "cell");
        if (isAuxiliarCell) {
            if (row === 0) {
                const cellIcon = document.createElement("i");
                cellIcon.setAttributeNode(document.createAttribute("class"));
                if (col === 0 || col === this.width - 1) {
                    cellIcon.setAttribute("class", "fas fa-chevron-up");
                }
                domCell.appendChild(cellIcon);
            } else {
                const cellSpan = document.createElement("span");
                if (row === 1) {
                    cellSpan.style.color = "grey";
                } else {
                    cellSpan.style.color = "blue";
                }
                domCell.appendChild(cellSpan);
            }
        } else if (row === this.height - 1) {
            utilities.addClass(domCell, ["blocked-cell", "black"]);
        }
        return domCell;
    }

    getAuxiliarMatrixAcces(rowLength, colLength) {
        const auxiliarMatrixAcces = [];
        const auxiliarMatrix = document.createElement("div");
        auxiliarMatrix.setAttribute("class", "matrix");
        for (let i = 0; i < rowLength; i++) {
            const auxiliarRow = document.createElement("div");
            auxiliarRow.setAttribute("class", "auxiliar-row");
            if (i === 1 || i === 2) {
                const rowSpan = document.createElement("row");
                rowSpan.setAttribute("class", "row-icon");
                if (i === 1) {
                    rowSpan.textContent = "h";
                } else {
                    const rowIcon = document.createElement("i");
                    rowIcon.setAttribute("class", "fas fa-tint");
                    rowSpan.appendChild(rowIcon);
                }
                auxiliarRow.appendChild(rowSpan);
            }
            const auxiliarRowAcces = [];
            for (let j = 0; j < colLength; j++) {
                const currentCell = this.newDomCell(i, j, true);
                auxiliarRow.appendChild(currentCell);
                auxiliarRowAcces.push(currentCell);
            }
            auxiliarMatrix.appendChild(auxiliarRow);
            auxiliarMatrixAcces.push(auxiliarRowAcces);
        }
        document.getElementById("matrix-container").appendChild(auxiliarMatrix);
        return auxiliarMatrixAcces;
    }

    renew(isWaterRemove=false) {
        const classesToKeep = {"cell": true};
        if (isWaterRemove) {
            classesToKeep["blocked-cell"] = true;
        }
        for (let i = 0; i < this.domAccesMatrixCells.length; i++) {
            for (let j = 0; j < this.domAccesMatrixCells[0].length; j++) {
                this.renewCell(i, j, false, classesToKeep);
            }
        }
        for (let i = 0; i < this.auxiliarMatrixAcces.length; i++) {
            for (let j = 0; j < this.auxiliarMatrixAcces[0].length; j++) {
                this.renewCell(i, j, true);
            }
        }
        this.isTraversed = false;
    }

    renewCell(row, col, isAuxiliarCell, classesToKeep=null) {
        if (isAuxiliarCell) {
            const cell = this.auxiliarMatrixAcces[row][col];
            if (row === 0) {
                if (col === 0 || col === this.width - 1) {
                    utilities.addClass(cell.firstChild, ["fas", "fa-chevron-up"]);
                } else {
                    utilities.removeClass(cell.firstChild, ["fas", "fa-chevron-up"]);
                }
            } else {
                cell.firstChild.textContent = "";
            }
        } else if (row !== this.height - 1) {
            const cell = this.domAccesMatrixCells[row][col];
            const classesToRemove = [];
            for (const className of cell.classList) {
                 if (!(className in classesToKeep)) {
                    classesToRemove.push(className);
                }
            }
            utilities.removeClass(cell, classesToRemove);     
        }
    }
}

