import React from 'react';
import {Switch} from 'react-router-dom';
import PublicRoute from "./core/auth/publicRoute";
import PrivateRoute from "./core/auth/privateRoute";
import Login from './containers/login/login';
import GameScore from './containers/game/components/gameScore/gameScore';
import CreateGame from './containers/game/createGame/CreateGame';
import CreateGroup from './containers/game/createGroup/CreateGroup';
import CreateSerie from './containers/game/createSerie/CreateSerie';
import PlayView from './containers/play/playView/PlayView';
import GamesInSerieView from './containers/play/games/GamesInSerieView';
import GroupView from './containers/group/groupView/GroupView';
import SerieView from './containers/serie/serieView/SerieView';


const Router = () => (
    <Switch>
        <PrivateRoute exact path='/' component={Login}/>
        <PrivateRoute exact path='/play/serie/:serieId/game/:gameId' component={GameScore}/>
        <PrivateRoute exact path='/play/serie/:serieId' component={GamesInSerieView}/>
        <PrivateRoute exact path='/create-game' component={CreateGame}/>
        <PrivateRoute exact path='/group/create' component={CreateGroup}/>
        <PrivateRoute exact path='/serie/create' component={CreateSerie}/>
        <PrivateRoute exact path='/group' component={GroupView}/>
        <PrivateRoute exact path='/serie' component={SerieView}/>
        <PrivateRoute exact path='/play' component={PlayView}/>
        <PublicRoute exact path='/login' component={Login}/>
    </Switch>
);

export default Router;
