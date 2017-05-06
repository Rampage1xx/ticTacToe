import createHistory from 'history/createMemoryHistory';
import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {combineReducers} from 'redux-immutable';
import createSagaMiddleware from 'redux-saga';
import {gameStatusReducer} from './Reducers';
declare const window;
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    gameStatus: gameStatusReducer
});

const reactRouterMiddleware = routerMiddleware(history);

export const store = createStore(reducers,
    composeEnhancers(applyMiddleware(reactRouterMiddleware, sagaMiddleware))
);

