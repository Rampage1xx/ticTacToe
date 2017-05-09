import * as React from 'react';
import {Route} from 'react-router-dom';
import {ChoosePlayers} from './Containers/ChoosePlayers';
import {ChooseSymbol} from './Containers/ChooseSymbol';
import {TicTacToeConnected} from './Containers/ticTacToe';

export const routes = (
    <div>
        <Route exact path='/' component={TicTacToeConnected}/>
        <Route path='/choosePlayerSize' component={ChoosePlayers}/>
        <Route path='/chooseSymbol' component={ChooseSymbol}/>

    </div>
);

