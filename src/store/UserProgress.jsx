import { createContext, useState } from "react"

const UserProgress = createContext({
    progress: '',
    showCart: ()=>{},
    hideCart: ()=>{},
    showCheckout: ()=>{},
    hideCheckout: ()=>{},
    success: ()=>{}
})



export function UserProgressProvider({children}){

    const [cart , setcart] = useState('')

    function showCart(){
        setcart('cart')
    }

    function hideCart(){
        setcart('')
    }

    function showCheckout(){
        setcart('checkout')
    }

    function hideCheckout(){
        setcart('')
    }

    function success(){
        setcart('success')
    }


    const cartvalue = {
        progress: cart,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        success
    }





    return (
        <UserProgress.Provider value={cartvalue}>{children}</UserProgress.Provider>
    )
}





export default UserProgress