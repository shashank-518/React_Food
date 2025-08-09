import React, { useContext } from 'react'
import Modals from './UI/Modals'
import { CartContext } from '../store/CreateCart'
import Input from './UI/Input'
import Button from './UI/Button'
import UserProgress from '../store/UserProgress'
import { formatcurrency } from '../util/formatting'
import usehttp from '../hooks/usehttp'
import Error from './Error'

const configdata = {
    method: 'POST' ,
    headers:{
        'Content-Type': 'application/json'
    }
}


const Checkout = () => {

    const cartctx = useContext(CartContext)
    const userctx = useContext(UserProgress)

    const {data , isLoading , error , sendRequest} = usehttp('http://localhost:3000/orders' ,  configdata , )

    const total = cartctx.items.reduce((totalvalue, item) => {
        return totalvalue + item.quantity * item.price;
      }, 0);

    function handleClose(){
          return userctx.hideCheckout()
    }

    function handleSuccess(){
        return userctx.success()
    }


    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerdata = Object.fromEntries(fd.entries())


        sendRequest(JSON.stringify({
            order:{
                items:cartctx.items,
                customer: customerdata
            }
        }))

    }

    let action = ( 
        <>
                <Button type= "button" textOnly>Close</Button>
                <Button onClick = {handleSuccess}  >Submit Order</Button>
        </>
    )

    if(isLoading){
        action = <span>Data is sending....</span>
    }

    if(data && !error){
        return (
        <Modals open={userctx.progress === 'success'} onclose={handleClose} >
            <h2>Success</h2>
            <p>Your Order have been placed Successfully</p>
            <p>We will get Back to You after Sometimes</p>
            <Button onClick = {handleClose}>Close</Button>
        </Modals>
        )
    }




  return (
    <Modals open={userctx.progress === 'checkout'} onclose={handleClose}>
        <form onSubmit ={handleSubmit}>
            <h2>Checkout</h2>
            <p>Your Total is : {formatcurrency.format(total)}</p>

            <Input label="Full Name" type="text" id="name"/>
            <Input label="E-Mail Address" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>

            <div className='control-row' >
                <Input label= "Postal Code" type="text" id="postal-code" />
                <Input label= "City" type="text" id="city" />
            </div>

            {error && <Error title= "Something went Wrong" message={error} />}

            <p className='modal-actions'>
                {action}
            </p>
        </form>
    </Modals>
  )
}

export default Checkout
