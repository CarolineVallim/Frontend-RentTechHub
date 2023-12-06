import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../Context/cart.context";
import axios from "axios";
import PaypalCheckoutButton from "../../Components/Paypal/index"

export default function Checkout() {
    const location = useLocation();

  const navigate = useNavigate();
  const { cart, dispatch } = useCart() || {};

  console.log("Cart in Checkout component:", cart);
  
  // const finalPrice()


  return (
    <div className="checkout">
        
    </div>
  )
}