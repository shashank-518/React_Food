import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modals({children , open , classname = ' ' , onclose }){

    const dialog = useRef()

    useEffect(()=>{
        const modal = dialog.current
        if(open){
            modal.showModal();
        }

        return ()=>{modal.close()}
    },[open])


    return (
        createPortal(<dialog ref={dialog} className= {`modal ${classname}`} onClose={onclose}  >{children}</dialog> , document.getElementById('modal'))
    )
}