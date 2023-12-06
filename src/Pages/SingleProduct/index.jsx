import "./styles.css"
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../Context/cart.context";
import {Divider, Slider, Button} from "@nextui-org/react";
import { AuthContext } from "../../Context/auth.context";

export default function SingleProduct() {
    const [product, setProduct] = useState(null);
    const [sliderValue, setSliderValue] = useState(1);
    const { id } = useParams();
    const [formattedDate, setFormattedDate] = useState('');
    const [productCount, setProductCount] = useState(1);
    const { cart, dispatch } = useCart() || {};
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const API_URL = "http://localhost:5005/api";
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useContext(AuthContext);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/products`);
          console.log("API Response:", response.data);
          const productsArray = response.data || [];
          const selectedProduct = productsArray.find((product) => product._id === id);
          setProduct(selectedProduct);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [id]);

  const handleButtonClick = async () => {
    try {
      setIsLoading(true);

      await someAsyncFunction();

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const someAsyncFunction = async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  const handleAddToCart = async () => {
    if (!product) {
      console.error("Product not found.");
      return;
    }

    const cart = {
      total: currentPrice(),
      shipping: 5,
    };

    try {
      const addCart = await axios.put(`${API_URL}/cart/${user._id}/product/${product._id}`, cart);
      setIsAddedToCart(true);
      console.log(addCart)
    } catch (error) {
      console.error("Error posting product:", error);
    }
  };

  

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const currentPrice = () => {
    if (product !== null) {
      return sliderValue * product.rentalPrice;
    }
    return 0;
  };
  
  

  return (
    <div className="product-page-container">
      {product !== null ? (
        <>
          <div className="product-photo-container">
            <img className="product-photo" src={product.image} alt="Product photo" />
          </div>
          <div className="product-details-container">
            <div className="page">
              <div className="product-details">
                <div className="details-container">
                  <span className="product-name">{product.name}</span>
                    <div className="slider">
                    <Slider
                      size="md"
                      step={1}
                      color="foreground"
                      label="Amount of Rent Days"
                      showSteps={true}
                      maxValue={14}
                      minValue={1}
                      value={sliderValue}
                      onChange={handleSliderChange}
                      className="max-w-md"
                    />

                    <p className="rental-price">Rental Price: {currentPrice()}$</p>
                  </div>
                  </div>
              </div>
              <div className="description-div">
                <h3 className="product-description-title">Description</h3>
                <span className="product-description">{product.description}</span>
              </div>
              <div className="back-button">
                <Button  isLoading={isLoading} onClick={handleButtonClick} style={{ backgroundColor: '#4CAF4F', color: 'white',}}>
                  <Link to={"/products"}>
                    <button className="back-button">Back</button>
                  </Link>
                </Button>
                <div className="add-button">
                  <button onClick={handleAddToCart}>Add to Cart</button>
                  {isAddedToCart && <p>Tickets added to cart!</p>}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
 } 