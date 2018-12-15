import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './containers/login/login'
import Game from './containers/game/Game'
import GameScore from './containers/game/components/gameScore/gameScore'

const Router = () => (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/game' component={Game}/>
        <Route exact path='/game/:id' component={GameScore}/>
    </Switch>
);

export default Router;
