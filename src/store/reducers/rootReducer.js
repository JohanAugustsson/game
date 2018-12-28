import {combineReducers} from 'redux';
import AuthReducer from './authReducer'
import UsersReducer from './UsersReducer'
import GameReducer from './GameReducer'
import AllGamesReducer from './AllGamesReducer'
import GameActivityReducer from "./GameActivityReducer";
import GamePlayerReducer from "./GamePlayerReducer";
import GroupReducer from "./GroupReducer";
import GroupPlayerReducer from "./GroupPlayerReducer";
import SerieReducer from "./SerieReducer";
import SnackbarReducer from "./SnackbarReducer";

const RootReducer = combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    games: AllGamesReducer,
    game: GameReducer,
    gameActivities: GameActivityReducer,
    gamePlayer: GamePlayerReducer,
    groups: GroupReducer,
    groupPlayer: GroupPlayerReducer,
    series:SerieReducer,
    snackbar: SnackbarReducer,
});

export default RootReducer;
