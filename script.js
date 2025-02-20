// Create the Sudoku grid dynamically
const grid = document.querySelector(".soduku-grid");

for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        const cell = document.createElement("input");
        cell.type = 'text';
        cell.maxLength = 1;
        cell.id = `cell-${row}-${col}`;
        cell.classList.add('soduku-cell');

        // Add bold borders for 3x3 blocks
        if (row % 3 === 0) cell.classList.add('top-border');
        if (col % 3 === 0) cell.classList.add('left-border');

        // Restrict input to digits only
        cell.addEventListener('input', () => {
            if (!/^[1-9]?$/.test(cell.value)) {
                cell.value = '';
            }
        });

        grid.appendChild(cell);
    }
}

// Function to solve Sudoku
function solveSudoku() {
    const sudokuGrid = getGrid();
    if (solve(sudokuGrid)) {
        updateGrid(sudokuGrid);
        console.log("🎯 Sudoku solved!");
    } else {
        alert("⚠️ Invalid Sudoku puzzle!");
    }
}

// Function to reset the Sudoku grid
function resetGrid() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            if (cell) cell.value ='';
        }
    }
    console.log("🔄 Grid reset!");
}

// Function to get the Sudoku grid from inputs
function getGrid() {
    const sudokuGrid = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`).value;
            let value = cell ? parseInt(cell) : 0;
            row.push(isNaN(value) ? 0 : value);
        }
        sudokuGrid.push(row);
    }
    return sudokuGrid;
}

// Backtracking Sudoku Solver
function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;

                        if (solve(grid)) return true;

                        grid[row][col] = 0; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Function to check if placing a number is valid
function isValid(grid, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

// Update the UI with the solved grid
function updateGrid(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            if (cell) cell.value = grid[i][j];
        }
    }
}

window.onload = function() {
    document.getElementById("solve-btn").addEventListener("click",solveSudoku);
    document.getElementById("reset-btn").addEventListener("click",resetGrid);
};
