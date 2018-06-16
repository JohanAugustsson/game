import React from 'react';

export default function ProductListItem(props) {
  const amount = props.cart.find( item => item.id === props.product.id)
  return (
    <div className="productListItem" >
      <h3> {props.product.name}</h3>
      <img
        height = {100}
        title = {props.product.name}
        src = {`/products/img/${props.product.image}`}
      />
      <div>{ props.product.description }</div>
      <div>${ props.product.price }</div>
      <div>
        <button
          onClick={ props.addToCart }>
          Add to cart
           {amount ? amount.quantity : "0"}
        </button>
      </div>

    </div>
  )
}
