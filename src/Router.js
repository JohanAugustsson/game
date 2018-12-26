import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './containers/login/login'
import GameView from './containers/game/GameView'
import GameScore from './containers/game/components/gameScore/gameScore'
import CreateGame from './containers/game/createGame/CreateGame'

const Router = () => (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/game' component={GameView}/>
        <Route exact path='/game/:id' component={GameScore}/>
        <Route exact path='/create-game' component={CreateGame}/>
    </Switch>
);

export default Router;
