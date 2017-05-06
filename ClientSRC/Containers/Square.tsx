import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {consumeRemainingContainersAndRemoveSquare} from '../GameLogic/SharedLogic';
import {
    makeConsumedSquares, makeSelectModal, makeSelectPcEnabled, makeSelectPlayerTurn, makeSelectSymbol
} from '../Selectors/GameStatusSelector';
// INTERFACES

class Square extends Component<ISquareProps, ISquareState> {
    // SETTING PROPERTIES

    private cssClass: string = '';
    private content: string = '';
    private notRun: boolean = true;
    private cssConsumedSquare: boolean | string = false;
    // CONSTRUCTOR AND SETTING STATE
    constructor(props: ISquareProps) {
        super(props);
        // result state controls if the square has been consumed by the player or computer
        this.state = {result: false};
        this.onClickHandleEffects = this.onClickHandleEffects.bind(this);
    }

    // COMPONENT LIFE CYCLE METHODS
    public componentDidUpdate() {
        // proceeds to consume the square used by the computer; to do so we check that:
        // a) the utilized square is indeed equal to the number assigned to the class instance;
        // b) we proceed then to activate the triggerSquare function
        const {consumedSquares, number, symbol} = this.props;
        if (consumedSquares === number && this.notRun) {
            this.notRun = false;
            this.triggerSquare(symbol);
        }
    }

    // DEBUG STUFF

    // EVENT
    // the symbol: boolean indicates if we should assign a cross(false) or a  circle(true)
    //  doing so we know which css class we should implement in the div
    private triggerSquare(symbol: boolean) {
        this.notRun = false;
        this.cssClass = `${symbol ? 'activeCircle' : 'activeCross'}`;
        this.cssConsumedSquare = 'consumedSquare';
        this.setState({result: true});
        this.content = symbol ? 'O' : 'X';
    };

    // CLICK HANDLER
    // TODO: refactor consumeRemainingContainersAndRemoveSquare arguments into a single object
    // function arguments of consumeRemainingContainersAndRemoveSquare
    // should be refactored as an object to be more clear.
    // In the meanwhile I hope this description will suffice, from left to right:
    // a)the square number player activated,
    // b)the symbol used,
    // c)gameOver: if true the game ends. This value is  used by the computer,
    // d) if that action has been started by the player,
    // e) if the PC is enabled in this game session
    private consumeSquare = () => {
        const {number, symbol, pcEnabled} = this.props;
        symbol ? consumeRemainingContainersAndRemoveSquare({
            itemSpliced: number,
            symbol: true,
            gameOver: false,
            playerTurn: true,
            pcEnabled
        }) :
            consumeRemainingContainersAndRemoveSquare({
                itemSpliced: number,
                symbol: false,
                gameOver: false,
                playerTurn: true,
                pcEnabled
            });
        this.content = symbol ? 'O' : 'X';
        this.cssClass = `${symbol ? 'activeCircle' : 'activeCross'}`;
        this.cssConsumedSquare = 'consumedSquare';
        this.setState({
            result: true
        });
    };

    private onClickHandleEffects = () => {
        return !this.state.result ? this.consumeSquare() : '';

    };

    public render() {

        // EVENT
        // ON CLICK HANDLER `child ${this.cssConsumedSquare}`
        const cssSquare = this.cssConsumedSquare ? this.cssConsumedSquare : 'child';
        // RENDERING
        return (
            <div className={(cssSquare as any)} onClick={this.onClickHandleEffects}>
                <p className={`red ${this.cssClass}`}> {this.content} </p>
            </div>
        );
    }
}
const mapStateToProps: any = createStructuredSelector({
    playerTurn: makeSelectPlayerTurn,
    symbol: makeSelectSymbol,
    modal: makeSelectModal,
    pcEnabled: makeSelectPcEnabled,
    consumedSquares: makeConsumedSquares
});

export const ConnectedSquare: any = connect(mapStateToProps)(Square);

