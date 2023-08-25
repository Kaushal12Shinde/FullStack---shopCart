import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../Slice/CartSlice";
import { useNavigate } from "react-router-dom";
import CartCard from "./CartCard";

const Cart = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const {isAuthenticated} = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    // alert to add
  };

  const handleCheckOut = ()=>{
    isAuthenticated ? navigate("/shipping") : navigate("/login")
  }

  const viewProduct = () => {
    navigate(`/products`);
  };

  return (
    <>
      {cartItem.length === 0 ? (
        <div className="Cart" style={{ marginTop: "10%" }}>
          <h2>Cart is Empty</h2>
          <button className="checkout" onClick={viewProduct}>
            View Products
          </button>
        </div>
      ) : (
        <>
          <div className="Cart">
            {cartItem.map((item) => (
              <CartCard
                key={item.product}
                item={item}
                handleRemove={handleRemove}
              />
            ))}
            <h2>
              Total Price = ₹
              {cartItem.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}
            </h2>
            <button className="checkout" onClick={handleCheckOut}>CHECKOUT</button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
