import React, { Component } from 'react';
import Router from './Router';
import { Switch, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const Navigation = (props) => (
  <nav>
    <ul>
      <li><NavLink to='/'>Skapa användare</NavLink></li>
      <li><NavLink to='/game'>Game</NavLink></li>
    </ul>
  </nav>
)

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <Navigation />
        <Router />
      </div>
    )
  };
}

export default App;
