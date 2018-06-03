import React from 'react';
import { connect } from 'react-redux';

export const cartItemsWithQuantity = (cartItems) =>{
  let Obj = {}
  if(cartItems.length > 0){

    cartItems.forEach(item =>{
      if( Obj.hasOwnProperty(item.id)){
        Obj[item.id] = Obj[item.id] + 1
      } else {
        Obj = {...Obj, [item.id] : 1}
      }
    })
  }
  return Obj
}
// om den finns lägg till 1.
// om den inte finns pusha in i listan.

//
// return cartItems.reduce((acc, item) =>{
//   const filteredItem = acc.filter( item2 => item2.id === item.id )[0]
//
//   (filteredItem !== undefined)  ?   filteredItem.quantity++ : acc.push({...item , quantity : 1,})
//   return acc
// },[]) // [] är acc startvärde
