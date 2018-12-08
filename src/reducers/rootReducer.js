import { combineReducers } from 'redux';
import CartReducer from './CartReducer'
import AuthReducer from './authReducer'

const RootReducer = combineReducers({
  cart: CartReducer,
  auth: AuthReducer,
})

export default RootReducer;
