import {createSelector} from 'reselect';

const gameStatusSelector = (state) => state.get('gameStatus');

const abstractGameStatusSelector = (value: string) => createSelector(
    gameStatusSelector,
    (gameStatusSelector) => gameStatusSelector.get(value)
);
export const makeSelectSymbol = abstractGameStatusSelector('symbol');

export const makeSelectPlayerTurn = abstractGameStatusSelector('playerTurn');

export const makeSelectPcEnabled = abstractGameStatusSelector('pcEnabled');

export const makeSelectModal = abstractGameStatusSelector('modal');

export const makeConsumedSquares = abstractGameStatusSelector('consumedSquares');