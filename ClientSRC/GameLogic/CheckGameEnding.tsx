import {actionActivateModalNumber} from '../Actions/ActionCreators';
import {store} from '../StoreAndReducers/store';
import {rowsContainer} from './GenerateGame';
export const victoryVSPC = () => {
    store.dispatch(actionActivateModalNumber(4));
};

export const lost = () => {
    // the game over modal appears
    store.dispatch(actionActivateModalNumber(5));

};
export const victory = (symbol) => {
    // first modal is for the circle win, second one for the cross
    symbol ? store.dispatch(actionActivateModalNumber(7)) : store.dispatch(actionActivateModalNumber(8));
};


export const drawGame = () => {
    //  draw game modal appear
    store.dispatch(actionActivateModalNumber(6));
};

export const checkDraw = (): boolean => {
    /// returns true if there is a draw
    const result: boolean = rowsContainer.every((singleRow: number[]): boolean => {
        return (singleRow[0] === 3);
    });
    if (result) {
        drawGame();
//    we return false for compatibility reason for the while loop
        // inside pc game logic
        return false;
    }
    return !result;
};

export const checkVictoryOrLoss = (): boolean => {
    // every operator breaks the loop if the operation turns out to be false
    return rowsContainer.every((singleRow: number[]): boolean => {
        return (singleRow[1] !== -3 && singleRow[1] !== 3);
    });
};
