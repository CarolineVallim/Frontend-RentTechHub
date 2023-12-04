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
    const validProducts = cart.filter(product => product && product.products[0].product.stock !== undefined);
    return validProducts.reduce((total, product) => total + product.products[0].product.stock, 0);
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
        axios.delete(`${API_URL}/cart/${product.products[0].product._id}`)
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
    <div className="cart-container p-4">
      <h1 className="cart-title text-4xl font-bold mb-6">Your Cart</h1>
      <ul className="cart-products">
        {cart.map((product, index) => (
          <li key={index} className="cart-product mb-4 p-4 border rounded">
            <div className="cart-product-details flex items-center space-x-4">
              <img
                src={product.products[0].product.image}
                className="w-16 h-16 object-cover rounded"
                alt="Product"
              />
              <div className="ml-4">
                <p className="cart-product-name text-lg font-semibold">
                  {product.products[0].product.name}
                </p>
                <p className="text-gray-600">
                  - ${product.products[0].product.rentalPrice}
                </p>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-section mt-6 p-4 border rounded">
        <p className="total-text text-lg font-semibold">Total:</p>
        <p className="total-amount text-2xl font-bold">${calculateTotalPrice}</p>
        <button
          onClick={handleDeleteAll}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded focus:outline-none"
        >
          Delete All
        </button>
      </div>
      <button
        className="cart-checkout-button mt-6 bg-green-500 text-white py-2 px-4 rounded focus:outline-none"
        onClick={handleCheckout}
      >
        Go to Checkout
      </button>
    </div>
  );
}  