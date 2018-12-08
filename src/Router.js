import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './containers/login/login'
import Game from './containers/game/Game'

const Router = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route exact path='/game' component={Game} />
  </Switch>
)

export default Router;
