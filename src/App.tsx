import React, {Component} from "react";
import SnackBar from "./components/snackbar/Snackbar";
import {saveStateToLocalStorage} from "./core/store/localStorage";
import store from "./core/store/store";
import Router from "./Router";

let timestampLastUpdate = new Date().getTime();

class App extends Component {
    componentDidMount() {

        store.subscribe(() => {
            if (this.isTimeToUpdate()) {
                this.resetTimestamp();
                saveStateToLocalStorage({
                    auth: store.getState().auth,
                    timestamp: this.getTime(),
                });
            }
        });
    }

    getTime() {
        return new Date().getTime();
    }

    resetTimestamp() {
        timestampLastUpdate = this.getTime();
    }

    isTimeToUpdate() {
        return timestampLastUpdate < this.getTime() - 700;
    }

    render() {
        return (
            <div className="page-container">
                <Router/>
                <SnackBar/>
            </div>
        );
    }
}

export default App;
