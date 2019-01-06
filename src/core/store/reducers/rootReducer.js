import {combineReducers} from 'redux';
import AuthReducer from './authReducer'
import UsersReducer from './UsersReducer'
import GameReducer from './GameReducer'
import AllGamesReducer from './AllGamesReducer'
import GameActivityReducer from "./GameActivityReducer";
import GamePlayerReducer from "./GamePlayerReducer";
import GroupReducer from "./GroupReducer";
import GroupPlayerReducer from "./GroupPlayerReducer";
import SeriesReducer from "./SeriesReducer";
import SnackbarReducer from "./SnackbarReducer";
import SeriePlayerReducer from "./seriePlayerReducer";

const RootReducer = combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    games: AllGamesReducer,
    game: GameReducer,
    gameActivities: GameActivityReducer,
    gamePlayer: GamePlayerReducer,
    groups: GroupReducer,
    groupPlayer: GroupPlayerReducer,
    series: SeriesReducer,
    seriePlayer: SeriePlayerReducer,
    snackbar: SnackbarReducer,
});

export default RootReducer;
