import {combineReducers} from "redux";
import {ApplicationState} from "../applicationstate";
import AllGamesReducer from "./allGamesReducer";
import AuthReducer from "./authReducer";
import GameActivityReducer from "./gameActivityReducer";
import GamePlayerReducer from "./gamePlayerReducer";
import GameReducer from "./gameReducer";
import GroupPlayerReducer from "./groupPlayerReducer";
import GroupReducer from "./groupReducer";
import SeriePlayerReducer from "./seriePlayerReducer";
import SeriesReducer from "./seriesReducer";
import SnackbarReducer from "./snackbarReducer";
import UsersReducer from "./usersReducer";

const RootReducer = combineReducers<ApplicationState>({
    auth: AuthReducer,
    game: GameReducer,
    gameActivities: GameActivityReducer,
    gamePlayer: GamePlayerReducer,
    games: AllGamesReducer,
    groupPlayer: GroupPlayerReducer,
    groups: GroupReducer,
    seriePlayer: SeriePlayerReducer,
    series: SeriesReducer,
    snackbar: SnackbarReducer,
    users: UsersReducer,
});

export default RootReducer;
