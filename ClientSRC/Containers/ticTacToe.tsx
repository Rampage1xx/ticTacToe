import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {EndGameModal} from '../Component/EndGameComponent';
import {
    makeConsumedSquares, makeSelectModal, makeSelectPcEnabled, makeSelectPlayerTurn, makeSelectSymbol
} from '../Selectors/GameStatusSelector';
import {ChoosePlayers} from './ChoosePlayers';
import {ChooseSymbol} from './ChooseSymbol';
import {ConnectedSquare} from './Square';

export class TicTacToe extends Component<ITicTacToeProps, undefined> {

    public render() {
        // DESTRUCTURING PROPS
        const props = this.props;
        const {symbol, modal, pcEnabled} = props;

        return (
            <div className='parent-wrapper'>
                <div className='parent'>
                    <ChooseSymbol modal={modal}/>
                    <ChoosePlayers modal={modal} symbol={symbol} pcEnabled={pcEnabled}/>
                    <EndGameModal modal={modal} message={'Victory is yours!'} number={4}/>
                    <EndGameModal modal={modal} message={'Wops, you lost...!'} number={5}/>
                    <EndGameModal modal={modal} message={'Draw!'} number={6}/>
                    <EndGameModal modal={modal} message={'Circle wins!'} number={7}/>
                    <EndGameModal modal={modal} message={'Cross wins!'} number={8}/>
                    <ConnectedSquare number={0}/>
                    <ConnectedSquare number={1}/>
                    <ConnectedSquare number={2}/>
                    <ConnectedSquare number={3}/>
                    <ConnectedSquare number={4}/>
                    <ConnectedSquare number={5}/>
                    <ConnectedSquare number={6}/>
                    <ConnectedSquare number={7}/>
                    <ConnectedSquare number={8}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    playerTurn: makeSelectPlayerTurn,
    symbol: makeSelectSymbol,
    modal: makeSelectModal,
    pcEnabled: makeSelectPcEnabled,
    consumedSquares: makeConsumedSquares
});

export const TicTacToeConnected = connect(mapStateToProps, undefined)(TicTacToe);