import React from 'react';
import {Switch} from 'react-router-dom';
import PublicRoute from "./core/auth/publicRoute";
import PrivateRoute from "./core/auth/privateRoute";
import Login from './containers/login/login'
import GameScore from './containers/game/components/gameScore/gameScore'
import CreateGame from './containers/game/createGame/CreateGame'
import CreateGroup from './containers/game/createGroup/CreateGroup'
import CreateSerie from './containers/game/createSerie/CreateSerie'
import PlayView from './containers/play/playView/PlayView'

const Router = () => (
    <Switch>
        <PrivateRoute exact path='/' component={Login}/>
        <PrivateRoute exact path='/game/:id' component={GameScore}/>
        <PrivateRoute exact path='/create-game' component={CreateGame}/>
        <PrivateRoute exact path='/create-group' component={CreateGroup}/>
        <PrivateRoute exact path='/create-serie' component={CreateSerie}/>
        <PrivateRoute exact path='/play' component={PlayView}/>
        <PublicRoute exact path='/login' component={Login}/>
    </Switch>
);

export default Router;
