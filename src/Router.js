import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './containers/login/login'
import CartPage from './containers/cartpage/CartPage'

const Router = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route exact path='/cart' component={CartPage} />
  </Switch>
)

export default Router;
