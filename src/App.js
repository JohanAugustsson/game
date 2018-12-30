import React, {Component} from 'react';
import SnackBar from './components/snackbar/Snackbar'
import Router from "./Router";
import store from "./core/store/store";
import {saveState} from "./core/store/localStorage";


class App extends Component {
    componentDidMount() {
        store.subscribe(res => {
            saveState({
                auth: store.getState().auth
            });
        });
    }

    render() {
        return (
            <div className="page-container">
                <Router/>
                <SnackBar/>
            </div>
        )
    };
}

export default App;
