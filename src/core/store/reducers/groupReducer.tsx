import {Reducer} from "redux";
import {BaseReducerState} from "./baseReducerState";

const SET_GROUPS = "SET_GROUPS";
const CLEAR = "CLEAR";
// const REMOVE_GROUP = 'REMOVE_GROUP';

const initialState: BaseReducerState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const GroupReducer: Reducer<BaseReducerState> = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_GROUPS: {
            return {...state, data: payload, isFetched: true};
        }
        case CLEAR: {
            return initialState;
        }

        default:
            return state;
    }
};

export default GroupReducer;
export {SET_GROUPS};
