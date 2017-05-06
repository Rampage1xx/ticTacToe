import {CHOOSE_SYMBOL, CONSUMED_SQUARE, MODAL_STATE, PC_ENABLED, PLAYER_TURN} from './ActionType';

export const actionConsumedSquare: IActionConsumedSquare = ({square, symbol}) => {

    return {
        type: CONSUMED_SQUARE,
        square,
        symbol
    };
};

export const actionPlayerTurn: IActionPlayerTurn = ({playerTurn, symbol, square}) => {
    return {
        type: PLAYER_TURN,
        playerTurn,
        symbol,
        square
    };
};

export const actionChooseSymbol = (symbol: boolean) => {
    return {
        type: CHOOSE_SYMBOL,
        symbol
    };
};

export const actionPcEnabled = (pcEnabled: boolean) => {
    return {
        type: PC_ENABLED,
        pcEnabled
    };
};
// ACTIVATE THE CORRESPONDING MODAL
export const actionActivateModalNumber = (modal: number) => {
    return {
        type: MODAL_STATE,
        modal
    };
};
