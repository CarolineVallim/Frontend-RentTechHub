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
    dispatch({ type: "SET_CART", payload: response.data });
    setLoading(false);
  } catch (error) {
    setError(error.response?.data?.message || "An error occurred while fetching cart data");
    setLoading(false);
  }
};

useEffect(() => {
  if (user && user._id) {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/cart/user/${user._id}`);
        dispatch({ type: "SET_CART", payload: response.data });
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchData();
  }
}, [dispatch, user]);


  useEffect(() => {
    console.log("Cart State:", cart);
  }, [cart]);

  const calculateTotalPrice = () => {
    if (cart[0] && cart[0].products) {
      return cart[0].products.reduce((total, product) => total + product.rentalPrice, 0);
    }
    return 0;
  };

  const handleDelete = async (index) => {
    try {
      let data = await axios.put(`${API_URL}/cart/${cart[0]._id}/${index}`);
      dispatch({ type: "SET_CART", payload: data.updatedCart });
    } catch (error) {
      console.error("Error deleting item:", error);
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
    }
  };

  const updateCart = async () => {
    try {
      const newTotal = calculateTotalPrice();
      const response = await axios.put(`${API_URL}/cart/${user._id}/update-total`, { total: newTotal });
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Error updating cart total:', error);
    }
  };
  
  const handleCheckout = () => {
    updateCart()
    navigate("/checkout");
  };

  return (
    <div className="cart-container p-4">
      <h1 className="cart-title text-4xl font-bold mb-6">Your Cart</h1>
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
                <button
                  onClick={() => handleDelete(product._id)}
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
        <p className="total-amount text-2xl font-bold">${calculateTotalPrice()}</p>
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