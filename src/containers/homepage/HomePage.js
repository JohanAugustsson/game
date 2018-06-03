import React from 'react';
import ProductList from '../../components/products/ProductList';
import data from '../../mock/Products.json'

export default function HomePage(props){
  console.log(data);
  return (
    <div>
      <h2>Home Page</h2>
      <ProductList products={data}/>
    </div>
  )
}
