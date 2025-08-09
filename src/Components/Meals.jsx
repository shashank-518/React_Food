import React, { useEffect, useState } from 'react'
import MealsItem from './MealsItem'
import usehttp from '../hooks/usehttp'
import Error from './Error'

const config_data = {}

const Meals = () => {
    
    const {data , error , isloading} = usehttp('http://localhost:3000/meals' , config_data , [])
    


    if(isloading){
        return <p>Loading Fetch......</p>
    }

    console.log(error)

    if(error){
       return <Error title="Something is wrong" message={error} />
    }

    console.log(data)

  return (
    <>

    <ul id='meals'>

        {data.map((meals)=>{
            return(
                <MealsItem key = {meals.id}  meals = {meals}/>
            )

        })}



    </ul>
    
    
    
    </>
  )
}

export default Meals
