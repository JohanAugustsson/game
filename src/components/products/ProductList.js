import React from 'react';
import ProductListItem from './ProductListItem'
import { connect } from 'react-redux'
import { addProductToCart,removeProductFromCart } from '../../actions/actions'
import { cartItemsWithQuantity } from '../../helpers/CartQuantity'

function ProductList(props){
  let quantity = cartItemsWithQuantity(props.cart)
  console.log(quantity);
  return (
    <div className = "productList">
      { props.products.map( product =>
          <ProductListItem
            key={product.id}
            product={product}
            addToCart = { () => props.dispatch(addProductToCart(product))}
            cart={ quantity }
          />
      )}
    </div>
  )
}


let mapStateToProps = (state) => ({
  cart : state.cart
})

export default connect(mapStateToProps)(ProductList)
