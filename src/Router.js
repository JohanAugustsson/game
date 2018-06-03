import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './containers/homepage/HomePage'
import CartPage from './containers/cartpage/CartPage'

const Router = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/cart' component={CartPage} />
  </Switch>
)

export default Router;
