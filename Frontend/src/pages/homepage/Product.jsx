import React from 'react'
import Navbar from '../../Components/Navbar'
import ProductList from '../ProductList'
import Footer from '../../Components/Footer'

function Product() {
  return (
    <div>
        <Navbar/>
        <ProductList/>
        <Footer/>
    </div>
  )
}

export default Product