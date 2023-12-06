import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../Context/cart.context";
import axios from "axios";

export default function Checkout() {
    const location = useLocation();

  const navigate = useNavigate();
  const { cart, dispatch } = useCart() || {};

  console.log("Cart in Checkout component:", cart);
  
  // const finalPrice()


  return (
    <div className="checkout">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-description">
        <div className="checkout-resume">
            <p>Products</p>
            <h3>$ </h3>
        </div>
        <div className="cart-products">
            <ul className="cart-products">
                {cart[0] && cart[0].products && cart[0].products.map((product, index) => (
                    <li key={index} className="cart-product mb-4 p-4 border rounded">
                        <div className="cart-product-details flex items-center space-x-4">
                        <img
                            src={product.image}
                            className="w-16 h-16 object-cover rounded"
                            alt="Product"
                        />
                        <div className="ml-4">
                            <p className="cart-product-name text-lg font-semibold">
                            {product.name}
                            </p>
                            <p className="text-gray-600">
                            - ${product.rentalPrice}
                            </p>
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className="">
            <h3>Subtotal</h3>
            <h3>$ {}</h3>
        </div>
      </div>
    </div>
  );
}