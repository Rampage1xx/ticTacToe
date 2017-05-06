interface ITicTacToeProps {
    symbol: boolean;
    playerTurn: boolean;
    modal: number;
    pcEnabled: boolean;
    consumedSquares: number;
    number: number;
}

interface IPlayerProps {
    symbol: boolean;
    modal: number;
    pcEnabled: boolean;
}

interface ISymbolProps {
    modal: number;
}

interface ISquareState {
    result: boolean
}
interface ISquareProps {
    number: number;
    symbol: boolean;
    pcEnabled: boolean;
    consumedSquares: number;
}

interface IActionConsumedSquare {
    (parameters:{square: number, symbol: boolean})
}

interface IBaseParameters {
    (parameters:{containerIndex: number, symbol: boolean, gameOver: boolean,
     playerTurn: boolean, pcEnabled: boolean})
}

 interface IActionPlayerTurn {
     (parameters : {playerTurn: boolean, symbol: boolean, square})
 }

interface IGameParameters {
    (parameters: {itemSpliced: number, symbol: boolean, gameOver: boolean, playerTurn: boolean, pcEnabled: boolean}
    )
}

declare type TFindContainer = (idealValue: number, timesConsumed: number, symbol: boolean) => boolean

declare type TFind = (parameters: {timesConsumed: number, idealValue: number, idealValueCross: number}) => boolean

declare type TSquareOnClick = (result: boolean, number: number, symbol: boolean, pcEnabled: boolean) => any;

declare type TConsumeSquare = (squareNumber: number, symbol: boolean, pcEnabled: boolean) => void;

