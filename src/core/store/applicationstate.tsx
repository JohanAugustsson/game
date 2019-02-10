import {BaseReducerState} from "./reducers/baseReducerState";
import {SnackbarState} from "./reducers/snackbarReducer";

export interface ApplicationState {
    auth: BaseReducerState;
    game: BaseReducerState;
    gameActivities: BaseReducerState;
    gamePlayer: BaseReducerState;
    games: BaseReducerState;
    groupPlayer: BaseReducerState;
    groups: BaseReducerState;
    seriePlayer: BaseReducerState;
    series: BaseReducerState;
    snackbar: SnackbarState;
    users: BaseReducerState;
}
