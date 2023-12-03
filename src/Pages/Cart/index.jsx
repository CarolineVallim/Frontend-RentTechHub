import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../Context/cart.context";

export default function Cart() {
  const { cart, dispatch } = useCart() || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/cart');
        console.log("Response from backend:", response.data);  // Log the response
        dispatch({ type: "SET_CART", payload: response.data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  /*
  const calculateTotalPrice = () => {
    return cart.reduce((total, products) => total + (products.quantity ?? 0) * 25, 0);
  };

  if (loading) {
    return <img src="LOADING IMAGE" className="load"/>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:5005/api/products/${cart[index].id}`);
      const updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
      dispatch({ type: "SET_CART", payload: updatedCart });
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error scenarios here, e.g., show an error message to the user
    }
  };

  const handleDeleteAll = async () => {
    try {
      // Create an array of promises for each deletion request
      const deletePromises = cart.map((products) =>
        axios.delete(`http://localhost:5005/api/products/${products._id}`)
      );
  
      // Wait for all deletion requests to complete
      await Promise.all(deletePromises);
  
      // After all deletions are successful, update the local state
      dispatch({ type: "SET_CART", payload: [] });
    } catch (error) {
      console.error("Error deleting all products:", error);
      console.log("Error details:", error.response?.data);
      // Handle error scenarios here, e.g., show an error message to the user
    }
  };
  
  

  const handleCheckout = () => {
    // Navigate to the checkout page with the total price in the state
    navigate("/checkout", { state: { cart: cart, totalPrice: calculateTotalPrice() } });
  };
  */
  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <ul className="cart-products">
        {cart.map((products, index) => (
          <li key={index} className="cart-product">
            <div className="cart-product-details">
              <p className="cart-product-name">{`${products.name} ${products.image} - ${products.rentalPrice}$`}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-section">
        <p className="total-text">Total:</p>
        <p className="total-amount">${calculateTotalPrice()}</p>
        <button onClick={handleDeleteAll}>Delete All</button>
      </div>
      <button className="cart-checkout-button" onClick={handleCheckout}>
        Go to Checkout
      </button>
    </div>
  );
}