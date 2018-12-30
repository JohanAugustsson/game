import connect from "react-redux/es/connect/connect";
import {Route} from 'react-router-dom';
import React from "react";
import Redirect from "react-router/es/Redirect";

const PublicRoute = ({
                         isAuthenticated,
                         component: Component,
                         ...otherProps
                     }) => (
    <Route {...otherProps} component={(props) => {
        const {from} = props.location.state || {from: {pathname: '/create-game'}};
        if (isAuthenticated) {
            if (props.location.pathname === '/login') {
                if (from.pathname === '/login') {
                    from.pathname = '/create-game'
                }
                return (
                    <Redirect to={from}/>
                )
            } else {
                return (<Component {...props} />)
            }

        } else {
            return (
                <Component {...props} />
            );
        }
    }}/>
);

const mapStateToProps = (state, props) => {
    return {
        isAuthenticated: state.auth.data && state.auth.data.user ? !!state.auth.data.user.uid : false
    }
};

export default connect(mapStateToProps)(PublicRoute);