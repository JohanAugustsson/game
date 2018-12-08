import { combineReducers } from 'redux';
import CartReducer from './CartReducer'
import AuthReducer from './authReducer'
import UsersReducer from './UsersReducer'

const RootReducer = combineReducers({
  cart: CartReducer,
  auth: AuthReducer,
  users: UsersReducer,
})

export default RootReducer;
