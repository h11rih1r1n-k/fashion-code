import React from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeButton from "../../components/stripe-button/stripe-button.component";
import CartEmpty from "../../components/cart-empty/cart-empty.component";
import "./checkout.styles.scss";

function CheckoutPage() {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <div className="checkout-page">
      {total > 0 ? (
        <>
          <div className="checkout-header">
            <div className="header-block">
              <span>Product</span>
            </div>
            <div className="header-block">
              <span>Description</span>
            </div>
            <div className="header-block">
              <span>Quantity</span>
            </div>
            <div className="header-block">
              <span>Price</span>
            </div>
            <div className="header-block">
              <span>Remove</span>
            </div>
          </div>
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} cartItem={item} />
          ))}
          <div className="total">TOTAL: ${total} </div>
          <div className="test-warning">
            *Please use following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 02/22 - CVV: 123
          </div>
          <StripeButton price={total} />
        </>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}

export default CheckoutPage;
