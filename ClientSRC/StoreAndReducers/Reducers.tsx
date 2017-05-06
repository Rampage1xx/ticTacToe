import {List, Map} from 'immutable';
import {CHOOSE_SYMBOL, CONSUMED_SQUARE, MODAL_STATE, PC_ENABLED, PLAYER_TURN} from '../Actions/ActionType';

const gameStatusInitialState: TGameInitialStatus = Map({
    consumedSquares: -1,
    playerTurn: false,
    symbol: false,
    pcEnabled: false,
    modal: 1
});

export const gameStatusReducer: IGameStatusReducer = (state = gameStatusInitialState, action) => {
    switch (action.type) {
        case CONSUMED_SQUARE:
            return state.set('consumedSquares', action.square)
                .set('symbol', action.symbol);
        case PLAYER_TURN:
            return state
                .set('playerTurn', action.playerTurn)
                .set('symbol', action.symbol)
                .set('consumedSquares', action.square);
        case MODAL_STATE:
            return state
                .set('modal', action.modal);
        case CHOOSE_SYMBOL:
            return state
                .set('symbol', action.symbol);
        case PC_ENABLED:
            return state
                .set('pcEnabled', action.pcEnabled);
        default:
            return state;
    }
};

declare  type TGameInitialStatus = Map<string, List<number> | boolean | number>

declare type  IGameStatusReducer = (state: TGameInitialStatus, action: {
    type: string,
    square: number,
    playerTurn: boolean,
    symbol: boolean,
    modal: number,
    pcEnabled: boolean,
}) => TGameInitialStatus;