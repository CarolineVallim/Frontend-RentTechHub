import "./style.css"
import axios from 'axios';
import { useCart } from "../../Context/cart.context";
import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { AuthContext } from "../../Context/auth.context";
import { Button } from "@nextui-org/react";

const API_URL = "https://rent-tech-hub.adaptable.app/api";

function Completion(props) {

  const { cart, dispatch } = useCart() || {};;
	const [loading, setLoading] = useState(true);
	const { cartId } = useParams();
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [isRemovedFromCart, setIsRemovedFromCart] = useState(false);


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
    if(cart && cart[0]){      
      const emptyCart = async () => {
    
        try {
          const clearCart = await axios.put(`${API_URL}/cart/${cart[0]._id}/clearCart`);
          setIsRemovedFromCart(true);
          console.log(clearCart)
        } catch (error) {
          console.error("Error posting product:", error);
        }
      };
    
      emptyCart();
    }
  }, [cart])


    return (
      <div className="completion-page">
        <h1>Thank you! 🎉</h1>
      </div>
    )

  }
  
export default Completion;