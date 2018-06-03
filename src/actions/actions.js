const ADD = "ADD";
const REMOVE = "REMOVE";

let addProductToCart = (item) => {
  return {
    type: ADD,
    payload: item
  }
}

let removeProductFromCart = (item) => {
  return {
    type: REMOVE,
    payload: item
  }
}


export { addProductToCart }
