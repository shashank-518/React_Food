import { useContext } from "react";
import Modals from "./UI/Modals";
import { CartContext } from "../store/CreateCart";
import Button from "./UI/Button";
import { formatcurrency } from "../util/formatting.js";
import UserProgress from "../store/UserProgress";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartctx = useContext(CartContext);
  const userctx = useContext(UserProgress);

  const total = cartctx.items.reduce((totalvalue, item) => {
    return totalvalue + item.quantity * item.price;
  }, 0);

  function handleClose() {
    userctx.hideCart();
  }

  function handleCheckout(){
    userctx.showCheckout();
  }

  return (
    <Modals classname="cart" open={userctx.progress === "cart"} onclose={userctx.progress === "cart" ? handleClose: null} >
      <h2>Your Cart</h2>
      <ul>
        {cartctx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={()=> cartctx.Additem(item)}
              onDecrease={()=> cartctx.Deleteitem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">
        Your Total is : {formatcurrency.format(total)}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {total !== 0 && <Button onClick = {handleCheckout} > Go to Checkout</Button>}
      </p>
    </Modals>
  );
}
