import connect from "react-redux/es/connect/connect";
import {Route} from 'react-router-dom';
import React from "react";
import Redirect from "react-router/es/Redirect";
import ResponsiveDrawer from "../../components/responsiveDrawer/responsiveDrawer";

const PrivateRoute = ({
                          isAuthenticated,
                          component: Component,
                          ...otherProps
                      }) => (
    <Route {...otherProps} component={(props) => {
        if (isAuthenticated) {
            return (
                <div>
                    <ResponsiveDrawer>
                        <Component {...props} />
                    </ResponsiveDrawer>
                </div>
            );
        } else {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            );
        }
    }}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.data && state.auth.data.user ? !!state.auth.data.user.uid : false
});

export default connect(mapStateToProps)(PrivateRoute);