import React, {Component} from 'react';
import SnackBar from './components/snackbar/Snackbar'
import Router from "./Router";


class App extends Component {
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
