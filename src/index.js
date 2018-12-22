import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter,Route,Switch } from 'react-router-dom';

import reducers from './reducer';
import './config';
import './index.css';

import Login from './container/login';
import Register from './container/register';
import AuthRouter from './component/authroute';
import BossInfo from './container/bossinfo';
import GeniusInfo from './container/geniusinfo';
import Chat from './component/chat';
import Dashboard from "./component/dashboard";

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():f=>f
));
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter/>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/geniusinfo" component={GeniusInfo}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/chat/:user" component={Chat}/>
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

