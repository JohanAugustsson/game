
const ADD = "ADD";
const REMOVE = "REMOVE";
const initialState = []

const CartReducer= (state= initialState, {type, payload}) =>{

  switch (type) {
    case ADD: {
      return [...state, payload]
    }
    case REMOVE: {

      const firstMatchIndex = state.indexOf(payload);
      return state.filter( (item,index) => index !== firstMatchIndex )
    }
    default:
      return state;
  }
}

export default CartReducer;
