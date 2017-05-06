import * as React from 'react';
import {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {actionActivateModalNumber, actionPcEnabled} from '../Actions/ActionCreators';
import {passValuesToFind} from '../GameLogic/PcGameLogic';
import {store} from '../StoreAndReducers/store';

export class ChoosePlayers extends Component<IPlayerProps, undefined> {
    private clickHandlers: any;
    private booleansArray: boolean[] = [true, false];

    constructor(props: IPlayerProps) {
        super(props);
        props = this.props;
        this.clickHandlers = {};
        this.booleansArray.forEach((boolean, index) => {
            this.clickHandlers[index] = this.choosePlayerSizeMethod.bind(this, boolean);
        });
    }

    private choosePlayerSizeMethod(pcEnabled: boolean): void {
        const {symbol} = this.props;
        store.dispatch(actionPcEnabled(pcEnabled));
        store.dispatch(actionActivateModalNumber(3));
        if (pcEnabled) {
            passValuesToFind(!symbol);
        }
    }

    public  render() {

        return (
            <Modal
                className="modalPosition"
                show={this.props.modal === 2}
            >
                <Button bsStyle='primary' onClick={this.clickHandlers[0]}> One Player</Button>
                <Button bsStyle='danger' onClick={this.clickHandlers[1]}> Two Players</Button>
            </Modal>
        );
    }
}
