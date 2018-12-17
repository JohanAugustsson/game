import {combineReducers} from 'redux';
import CartReducer from './CartReducer'
import AuthReducer from './authReducer'
import UsersReducer from './UsersReducer'
import GameReducer from './GameReducer'
import AllGamesReducer from './AllGamesReducer'
import GameActivityReducer from "./GameActivityReducer";

const RootReducer = combineReducers({
    cart: CartReducer,
    auth: AuthReducer,
    users: UsersReducer,
    currentGame: GameReducer,
    games: AllGamesReducer,
    gameActivities: GameActivityReducer
});

export default RootReducer;