import React, { useContext } from 'react'
import { formatcurrency } from '../util/formatting'
import { CartContext } from '../store/CreateCart'

const CartItem = ({name , quantity , price , onIncrease , onDecrease }) => {
  return (
    <li className='cart-item'>
        <p>{name} - {quantity}  X  {formatcurrency.format(price)}</p>
        <p className='cart-item-actions'>
            <button onClick={onIncrease}>+</button>
            <span>{price}</span>
            <button onClick={onDecrease} >-</button>
        </p>
    </li>
  )
}

export default CartItem
