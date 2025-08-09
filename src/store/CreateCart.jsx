import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    Additem: (item)=>{},
    Deleteitem: (id)=>{}
});


function cartReducer(state ,action){
    if(action.type === 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.item.id )

        const updated_state = [...state.items]

        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex]
            const updated_item ={
                ...existingItem,
                quantity: existingItem.quantity +1
            }
            updated_state[existingCartItemIndex]= updated_item
        }
        else{
            updated_state.push({...action.item , quantity:1})
        }
        return {...state , items: updated_state}
    }
    if(action.type === 'REMOVE_ITEM'){

        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.id )
        const existingItem = state.items[existingCartItemIndex];
        const updated_state = [...state.items]


        if(existingItem.quantity === 1){
            updated_state.splice(existingCartItemIndex , 1)
        }
        else{
            const updated_item = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            }

            updated_state[existingCartItemIndex] = updated_item
        }

        return {...state , items: updated_state}


    }


    return state
}



export default  function CreateCart({children}){

    
    const [cart , dispatchCartAction] = useReducer(cartReducer , {items:[]})
    
    
    
    function Additem(item){
        dispatchCartAction({type: 'ADD_ITEM' , item })
    }
    
    function Deleteitem(id){
        dispatchCartAction({type: 'REMOVE_ITEM' , id })
    }
    
    const cartcontext = {
        items: cart.items,
        Additem,
        Deleteitem
    }

    console.log(cartcontext)

    return <CartContext.Provider value={cartcontext} >{children}</CartContext.Provider>
}

