import * as React from 'react';
import {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {actionChooseSymbol, actionActivateModalNumber} from '../Actions/ActionCreators';
import {store} from '../StoreAndReducers/store';


export class ChooseSymbol extends Component<ISymbolProps, undefined> {
    private clickHandlers: any;
    private booleanArray: boolean[] = [false, true];

    constructor(props) {
        super(props);
        this.clickHandlers = {};
        this.booleanArray.forEach((boolean, index) =>
            this.clickHandlers[index] = this.chooseSymbolMethod.bind(this, boolean));
    }

    private chooseSymbolMethod(symbol: boolean): void {
        store.dispatch(actionChooseSymbol(symbol));
        store.dispatch(actionActivateModalNumber(2));
    }

    public  render() {
        return (
            <Modal show={this.props.modal === 1}>
                <div>
                    <Button bsStyle='primary' onClick={this.clickHandlers[0]}>Cross</Button>
                    <Button bsStyle='danger' onClick={this.clickHandlers[1]}>Circle</Button>
                </div>
            </Modal>
        );
    }

}

