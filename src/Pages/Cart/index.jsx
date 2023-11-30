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
        const response = await axios.get('http://localhost:5005/item');
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

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.quantity ?? 0) * 25, 0);
  };

  if (loading) {
    return <img src="https://www.gifcen.com/wp-content/uploads/2021/01/rolling-football-ball-gif.gif" className="load"/>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:5005/item/${cart[index].id}`);
      const updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
      dispatch({ type: "SET_CART", payload: updatedCart });
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle error scenarios here, e.g., show an error message to the user
    }
  };

  const handleDeleteAll = async () => {
    try {
      // Create an array of promises for each deletion request
      const deletePromises = cart.map((item) =>
        axios.delete(`http://localhost:5005/item/${item.id}`)
      );
  
      // Wait for all deletion requests to complete
      await Promise.all(deletePromises);
  
      // After all deletions are successful, update the local state
      dispatch({ type: "SET_CART", payload: [] });
    } catch (error) {
      console.error("Error deleting all items:", error);
      console.log("Error details:", error.response?.data);
      // Handle error scenarios here, e.g., show an error message to the user
    }
  };
  
  

  const handleCheckout = () => {
    // Navigate to the checkout page with the total price in the state
    navigate("/checkout", { state: { cart: cart, totalPrice: calculateTotalPrice() } });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <ul className="cart-items">
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="cart-item-details">
              <p className="cart-item-name">{`${item.name} ${item.photo} - ${item.price}`}</p>
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