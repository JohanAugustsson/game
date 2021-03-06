import {Reducer} from "redux";

const SNACKBAR_MSG = "SNACKBAR_MSG";
const SNACKBAR_CLOSE = "SNACKBAR_CLOSE";
const SNACKBAR_ERROR = "SNACKBAR_ERROR";
const CLEAR = "CLEAR";

// const REMOVE_GROUP = 'REMOVE_GROUP';

export interface SnackbarState {
    open: boolean;
    error: boolean;
    data: any;
}

const initialState: SnackbarState = {
    open: false,
    error: false,
    data: "",
};

const SnackbarReducer: Reducer<SnackbarState> = (state = initialState, {type, payload}) => {

    switch (type) {
        case SNACKBAR_MSG: {
            return {...state, data: payload, open: true, error: false};
        }
        case SNACKBAR_CLOSE: {
            return {...state, data: "", open: false, error: false};
        }
        case SNACKBAR_ERROR: {
            return {...state, data: payload, open: true, error: true};
        }
        case CLEAR: {
            return initialState;
        }

        default:
            return state;
    }
};

export default SnackbarReducer;
export {SNACKBAR_MSG, SNACKBAR_CLOSE, SNACKBAR_ERROR};
