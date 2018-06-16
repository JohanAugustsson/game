import React from 'react';
import { connect } from 'react-redux';

export const cartItemsWithQuantity = (cartItems) =>{
  return cartItems.reduce((acc, item) =>{
     let filteredItem = acc.find( item2 => item2.id === item.id )

    filteredItem !== undefined ?   filteredItem.quantity++ : acc.push({...item , quantity : 1,})
    return acc;
  },[])
}
