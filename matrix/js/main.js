const R = 5;
const C = 6;
const r0 = 1;
const c0 = 4;
let verticalStep = 1;
let horizontalStep = 1;

let currentRow = r0, currentCol = c0;
let changeParametr = 'column+';

let output = [[`${r0}`, `${c0}`]];

if (R <= 100 && C <= 100 && R && C && r0 < R && c0 < C && c0 >= 0 && r0 >= 0) {
    while (output.length < R * C) {
        move()
    }

    console.log(output)
}
else {
    console.log('Error, invalid value')
}

function move() {
    
    if (changeParametr === 'column+') { 
        columnUp()
    }
    else if (changeParametr === 'column-') { 
        columnDown()
    }
    else if (changeParametr === 'row+') { 
        rowUp()
    }
    else if (changeParametr === 'row-') { 
        rowDown()
    }
}

function columnUp() {
    for (let j = 0; j < horizontalStep; j++) {
        currentCol++

        if (currentCol >= 0 && currentCol < C && currentRow >= 0 && currentRow < R) {
            output.push([`${currentRow}`, `${currentCol}`])
        }
    }

    changeParametr = 'row+'
    horizontalStep++
}

function columnDown() {
    for (let j = 0; j < horizontalStep; j++) {
        currentCol--

        if (currentCol >= 0 && currentCol < C && currentRow >= 0 && currentRow < R) {
            output.push([`${currentRow}`, `${currentCol}`])
        }
    }

    changeParametr = 'row-'
    horizontalStep++
}

function rowUp() {
    for (let j = 0; j < verticalStep; j++) {
        currentRow++

        if (currentCol >= 0 && currentCol < C && currentRow >= 0 && currentRow < R) {
            output.push([`${currentRow}`, `${currentCol}`])
        }
    }

    changeParametr = 'column-'
    verticalStep++
}

function rowDown() {
    for (let j = 0; j < verticalStep; j++) {
        currentRow--

        if (currentCol >= 0 && currentCol < C && currentRow >= 0 && currentRow < R) {
            output.push([`${currentRow}`, `${currentCol}`])
        }
    }

    changeParametr = 'column+'
    verticalStep++
}