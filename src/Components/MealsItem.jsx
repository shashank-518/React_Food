import React from 'react'
import { formatcurrency } from '../util/formatting'
import Button from './UI/Button'
import { useContext } from 'react'
import {CartContext} from '../store/CreateCart'

const MealsItem = ({ meals }) => {

  const createctx  =  useContext(CartContext)



  function handleClick(){
    createctx.Additem(meals)
  }


  return (
    <li className='meal-item' >
    <article>
    <img src={`http://localhost:3000/${meals.image}`} alt={meals.name} />
    <div>
    <h3>{meals.name}</h3>
    <p className='meal-item-price' >{formatcurrency.format(meals.price)}</p>
    <p className='meal-item-description' >{meals.description}</p>
    </div>
    <p className='meal-item-actions'>
          <Button onClick ={handleClick} >Add to Cart</Button>
    </p>
    </article>
</li>
  )
}

export default MealsItem
