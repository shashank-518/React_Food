import React, { useContext, useState } from 'react'
import imagelogo from '../assets/logo.jpg'
import Button from './UI/Button'
import { CartContext } from '../store/CreateCart'
import UserProgress from '../store/UserProgress'


const Header = () => {

  const cartctx = useContext(CartContext)
  const userctx =  useContext(UserProgress)

  const totalCartNumber = cartctx.items.reduce((acc , items) =>{
    return acc + items.quantity
  },0)

  function handleClick(){
    userctx.showCart()
  }


  return (
    <header id='main-header'>
        <div id='title'>
            <img src={imagelogo} alt="React image" />
            <h1>Food Adda</h1>
        </div>
        <nav>
        <Button textOnly onClick = {handleClick}  >Cart ({totalCartNumber})</Button>
        </nav>

    </header>
  )
}

export default Header
