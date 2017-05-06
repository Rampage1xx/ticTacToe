import {actionConsumedSquare, actionPlayerTurn} from '../Actions/ActionCreators';
import {store} from '../StoreAndReducers/store';
import {checkDraw, checkVictoryOrLoss, lost, victory, victoryVSPC} from './CheckGameEnding';
import {indexSquares, rowsContainer} from './GenerateGame';
import {passValuesToFind} from './PcGameLogic';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handOverControlToPlayer = (switchedSymbol, itemSpliced) =>
    store.dispatch(actionPlayerTurn({playerTurn: true, symbol: switchedSymbol, square: itemSpliced}));

const renderConsumedSquare = ({symbol, itemSpliced}) =>
    store.dispatch(actionConsumedSquare({square: itemSpliced, symbol}));

export const consumeRemainingContainersAndRemoveSquare: IGameParameters = ({itemSpliced, symbol,
                                                                           gameOver, playerTurn, pcEnabled}) => {

    indexSquares[itemSpliced].map((remainingContainersReference) => {
        //  cleaning the eliminated square references from the remaining containers
        rowsContainer[remainingContainersReference][0]++;
        symbol ? rowsContainer[remainingContainersReference][1]++ : rowsContainer[remainingContainersReference][1]--;
        const getIndexForContainer = rowsContainer[remainingContainersReference][2].indexOf(itemSpliced);
        rowsContainer[remainingContainersReference][2].splice(getIndexForContainer, 1);
    });

    renderConsumedSquare({symbol, itemSpliced});
    // checks if the game is over
    const gameNotFinished: boolean = checkVictoryOrLoss();
    if (!gameNotFinished) {
        return !playerTurn ? lost() : pcEnabled ? victoryVSPC() : victory(symbol);
    }
    // checks if the game is a draw
    const draw: boolean = checkDraw();
    if (!draw) {
        return 'game over';
    }

    sleep(200).then((x) =>
        !playerTurn ? handOverControlToPlayer(!symbol, 10) :
            pcEnabled ? passValuesToFind(!symbol) : handOverControlToPlayer(!symbol, 10)
    );
};
