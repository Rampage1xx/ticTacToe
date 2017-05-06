import {checkDraw} from './CheckGameEnding';
import {indexSquares, rowsContainer} from './GenerateGame';
import {consumeRemainingContainersAndRemoveSquare} from './SharedLogic';

// here we use the value found from the iterating schema

const useTheContainer: IBaseParameters = ({containerIndex, symbol, gameOver,
                                          playerTurn, pcEnabled}) => {

    // we increment the consumed number
    // refer to generate game for more infos
    rowsContainer[containerIndex][0]++;
    // if symbol true we add a number otherwise we subtract it
    symbol ? rowsContainer[containerIndex][1]++ : rowsContainer[containerIndex][1]--;
    //  we choose which square the operation should be attributed to
    const randomizer = Math.floor(Math.random() * rowsContainer[containerIndex][2].length);
    const squareChosenSpliced: number[] = rowsContainer[containerIndex][2].splice(randomizer, 1);
    // we splice it from the container square references
    const squareSplicedArrayToNumber = squareChosenSpliced[0];
    const findIndex = indexSquares[squareSplicedArrayToNumber].indexOf(containerIndex);
    indexSquares[squareSplicedArrayToNumber].splice(findIndex, 1);
    // we proceed to consume the remaining containers  in the same way we did here
    consumeRemainingContainersAndRemoveSquare({
        itemSpliced: squareSplicedArrayToNumber,
        symbol,
        gameOver,
        playerTurn,
        pcEnabled
    });

};

// findTheBestContainer and passValuesToFind form the iterating  pattern for the container array
// (aka iterators)

// searches if there is a container matching the criteria
const findTheBestContainer: TFindContainer = (idealValue, timesConsumed, symbol): boolean => {
    // every operator continues the loop as long it returns TRUE
    return rowsContainer.every((singleRow, containerIndex, array) => {
        if (singleRow[0] === timesConsumed && singleRow[1] === idealValue) {
            if (singleRow[2] === 2 || singleRow[2] === -2) {
                // found a container that ends the game
                useTheContainer({containerIndex, symbol, gameOver: true, playerTurn: false, pcEnabled: true});
                return false;
            }
            // proceeds to use the container found
            useTheContainer({containerIndex, symbol, gameOver: false, playerTurn: false, pcEnabled: true});
            return false;
        }
        return true;
    });
};

// gives the values to findTheBestContainer
export const passValuesToFind: any = (symbol: boolean): void => {
    let noResult: boolean = true;
    // finds the container to use
    const find: TFind = ({timesConsumed, idealValue, idealValueCross}) => {
        return !noResult ? false : symbol ? findTheBestContainer(idealValue, timesConsumed, symbol) :
            findTheBestContainer(idealValueCross, timesConsumed, symbol);
    };
    const checkDrawGame = () => {
        if (noResult) {
            checkDraw();
            return false;
        }
    };
    // The first and third value is represents the times that the container has been consumed.
    // A container is exhausted with three uses.
    // In visual terms imagine three  same symbol repeating in a line.

    // the second and fourth value represents how many symbols of the same kind are present in the container
    // positive values represent the Circle, Negative values the cross

    while (noResult) {
        noResult = find({timesConsumed: 2, idealValue: 2, idealValueCross: -2});
        noResult = find({timesConsumed: 2, idealValue: -2, idealValueCross: 2});
        noResult = find({timesConsumed: 1, idealValue: 1, idealValueCross: -1});
        noResult = find({timesConsumed: 0, idealValue: 0, idealValueCross: 0});
        noResult = find({timesConsumed: 1, idealValue: -1, idealValueCross: 1});
        noResult = find({timesConsumed: 2, idealValue: -2, idealValueCross: 2});
        noResult = find({timesConsumed: 2, idealValue: 0, idealValueCross: 0});
    }

    noResult = checkDrawGame();
};
