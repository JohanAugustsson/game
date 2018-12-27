import React, {Component} from 'react';
import ResponsiveDrawer from "./components/responsiveDrawer/responsiveDrawer";
import SnackBar from './components/snackbar/Snackbar'

const Navigation = () => (
    <ResponsiveDrawer/>
);

class App extends Component {
    render() {
        return (
            <div className="page-container">
                <Navigation/>
                <SnackBar/>
            </div>
        )
    };
}

export default App;
