import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import store from "./core/store/store";
import "./index.css";
// import registerServiceWorker from './registerServiceWorker';
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// registerServiceWorker();
