import {BaseReducerState} from "./baseReducerState";
import {Reducer} from "redux";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState: BaseReducerState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const AuthReducer: Reducer<BaseReducerState> = (state = initialState, {type, payload}) => {

    switch (type) {
        case LOGIN: {
            return {...state, data: payload, isFetched: true};
        }
        case LOGOUT: {
            return initialState;
        }

        default:
            return state;
    }
};

export default AuthReducer;
export {LOGIN, LOGOUT};
