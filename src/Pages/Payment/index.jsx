import "./index.css";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../Components/Payment/index";
import axios from 'axios';
import { useCart } from "../../Context/cart.context";
import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { AuthContext } from "../../Context/auth.context";


const API_URL = "https://rent-tech-hub.adaptable.app/api";

function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
	const { cart, dispatch } = useCart() || {};;
	const [loading, setLoading] = useState(true);
	const { cartId } = useParams();
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);


    
    useEffect(() => {
        axios.get(`${API_URL}/config`)
          .then(async (response) => {
            const { publishableKey } = response.data;
            setStripePromise(loadStripe(publishableKey));
            })
          .catch(error => {
            console.error("Error fetching config:", error);
          });
      }, []);

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
        if (loading === false && clientSecret === "" && cart[0] ) {
            const totalPrice = cart[0].total + cart[0].shipping;
            const amount = totalPrice * 100;
        
            axios.post(`${API_URL}/payment`, {
                amount,
                cart,
            })
            .then(async (response) => {

                const { clientSecret } = response.data;
                setClientSecret(clientSecret);
            })
            .catch((error) => {
                console.error("Error making payment request:", error);
            });
        }
    }, [loading, clientSecret, dispatch, cart]);

	return (
    <div className="payment-page">
      <h1 style={{fontSize:"24px", fontWeight:"bold"}}>Payment Page</h1>

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm prize={cart} />
        </Elements>
      )}
    </div>
    );
}

export default Payment