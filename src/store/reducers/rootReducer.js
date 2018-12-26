import {combineReducers} from 'redux';
import AuthReducer from './authReducer'
import UsersReducer from './UsersReducer'
import GameReducer from './GameReducer'
import AllGamesReducer from './AllGamesReducer'
import GameActivityReducer from "./GameActivityReducer";
import GamePlayerReducer from "./GamePlayerReducer";

const RootReducer = combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    games: AllGamesReducer,
    game: GameReducer,
    gameActivities: GameActivityReducer,
    gamePlayer: GamePlayerReducer
});

export default RootReducer;
