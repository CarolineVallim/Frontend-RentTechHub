import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../Context/cart.context";
import { AuthContext } from "../../Context/auth.context";
import "./styles.css"


export default function Cart() {
  const { cart, dispatch } = useCart() || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const API_URL = "http://localhost:5005/api"; 

const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart/user/${user._id}`);
    console.log("Full Response from backend:", response);
    dispatch({ type: "SET_CART", payload: response.data });
    setLoading(false);
  } catch (error) {
    console.error("Error fetching cart data:", error);
    setError(error.response?.data?.message || "An error occurred while fetching cart data");
    setLoading(false);
  }
};

useEffect(() => {
  console.log("Inside useEffect");
  if (user && user._id) {
    console.log("User ID:", user._id);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/cart/user/${user._id}`);
        console.log("Response from backend:", response.data);
        dispatch({ type: "SET_CART", payload: response.data });
        setLoading(false);
        console.log("Redux State after dispatch:");
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchData();
  }
}, [dispatch, user]);


  useEffect(() => {
    console.log("Cart State:", cart); // Log cart state
  }, [cart]);


  const calculateTotalPrice = () => {
    const validProducts = cart.filter(product => product && product.quantity !== undefined);
    return validProducts.reduce((total, product) => total + product.quantity, 0);
  };
  
  const handleDelete = async (index) => {
    try {
      const deletedProductId = cart[index]._id; // Assuming each product in the cart has an _id
      await axios.delete(`${API_URL}/cart/${deletedProductId}`);
      const updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
      dispatch({ type: "SET_CART", payload: updatedCart });
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error scenarios here, e.g., show an error message to the user
    }
  };

  const handleDeleteAll = async () => {
    try {
      const deletePromises = cart.map((product) =>
        axios.delete(`${API_URL}/cart/${product._id}`)
      );
      await Promise.all(deletePromises);
      dispatch({ type: "SET_CART", payload: [] });
    } catch (error) {
      console.error("Error deleting all products:", error);
      console.log("Error details:", error.response?.data);
      // Handle error scenarios here, e.g., show an error message to the user
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart: cart, totalPrice: calculateTotalPrice() } });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <ul className="cart-products">
        {cart.map((product, index) => (
          <li key={index} className="cart-product">
            <div className="cart-product-details">
              <p className="cart-product-name">
                {`${product.products[0].product.name} ${product.products[0].product.image} - ${product.products[0].product.rentalPrice}$`}
              </p>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-section">
        <p className="total-text">Total:</p>
        <p className="total-amount">${calculateTotalPrice}</p>
        <button onClick={handleDeleteAll}>Delete All</button>
      </div>
      <button className="cart-checkout-button" onClick={handleCheckout}>
        Go to Checkout
      </button>
    </div>
  );
}
