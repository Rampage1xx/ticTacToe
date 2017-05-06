// the rows are the various possible combinations that you can obtain to win the tictactoe game
// the rows container is made up by two numbers, the first one indicating the time it was consumed
// and the second one the current sum,  the third item is an  array that contains the
//  linked squares ([number,number,[number,number,number]).
export let rowsContainer: any [][];
// squares array, each one is linked to the belonging rows
export let indexSquares: number [][];

function generateGame() {
    // generate squares
    indexSquares = [
        [0, 3, 6],
        [0, 4],
        [0, 5, 7],
        [1, 3],
        [1, 4, 6, 7],
        [1, 5],
        [2, 3, 7],
        [2, 4],
        [2, 5, 6]
    ];
    // generate containers
    // fill initializes the undefined cells
    rowsContainer = new Array(8).fill(0).map((x) => Array(0));
    rowsContainer.forEach((row) => row.push(0, 0, []));

    let loop: number = -1;
    indexSquares.map((rowReferenceArray) => {
        loop++;
        rowReferenceArray.map((rowReference) => {
            rowsContainer[rowReference][2].push(loop);
        });
    });
}

generateGame();
