import "./styles.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../Context/cart.context";
import {Divider, Slider} from "@nextui-org/react";

export default function SingleProduct() {
    const [product, setProduct] = useState(null);
    const [sliderValue, setSliderValue] = useState(1);
    const { id } = useParams();
    const [formattedDate, setFormattedDate] = useState('');
    const [productCount, setProductCount] = useState(1);
    const { cart = [], dispatch } = useCart() || {};
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const API_URL = "http://localhost:5005/api";
  
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

  const handleIncrement = () => {
    setProductCount(productCount + 1);
  };

  const handleDecrement = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  const handleAddToCart = async () => {
    const product = {
      name: product.name,
      description: product.description,
      image: product.image,
      quantity: productCount,
    };

    try {
        await axios.post(`${API_URL}/cart`, product);

        setIsAddedToCart(true);

    } catch (error) {
      console.error("Error posting product:", error);
    }
  }
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

                  <p>Rental Price: {currentPrice()}$</p>
                </div>
              </div>
              <div>
                <h3 className="product-description-title">Description</h3>
                <span className="product-description">{product.description}</span>
              </div>
              <div className="back-button">
                <Link to={"/products"}>
                  <button className="back-button">Back</button>
                </Link>
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