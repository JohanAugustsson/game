import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './containers/login/login'
import GameScore from './containers/game/components/gameScore/gameScore'
import CreateGame from './containers/game/createGame/CreateGame'
import CreateGroup from './containers/game/createGroup/CreateGroup'
import CreateSerie from './containers/game/createSerie/CreateSerie'

const Router = () => (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/game/:id' component={GameScore}/>
        <Route exact path='/create-game' component={CreateGame}/>
        <Route exact path='/create-group' component={CreateGroup}/>
        <Route exact path='/create-serie' component={CreateSerie}/>
    </Switch>
);

export default Router;
