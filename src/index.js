import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './config/store'
//import registerServiceWorker from './registerServiceWorker';
const app = (
  <Provider store= { store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)


ReactDOM.render(app, document.getElementById('root'));
//registerServiceWorker();
