const LOGIN = 'LOGIN';
const LOGOUT = "LOGOUT";

const initialState = {
    isFetched: false,
    isFetching: false,
    data: {}
};

const AuthReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case LOGIN: {
            return {...state, data: payload, isFetched: true}
        }
        case LOGOUT: {
            return initialState
        }

        default:
            return state;
    }
};

export default AuthReducer;
export {LOGIN, LOGOUT};
