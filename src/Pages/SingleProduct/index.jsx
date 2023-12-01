import "./styles.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../Context/cart.context";

export default function SingleProduct() {
  const [products, setProducts] = useState(null);
  const { id } = useParams();
  const [formattedDate, setFormattedDate] = useState('');
  const [productCount, setProductCount] = useState(1);
  const { cart = [], dispatch } = useCart() || {};
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const API_URL = "http://localhost:5005/api"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        console.log("API Response:", response.data);        
        const productsArray = response.data.products || [];
        const selectedProduct = productsArray.find((m) => m.id === parseInt(id));        
        setProducts(selectedProduct);
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
      name: products.name,
      description: products.description,
      image: products.image,
      quantity: productCount,
    };

    try {
        await axios.post(`${API_URL}/cart`, product);

        setIsAddedToCart(true);

    } catch (error) {
      console.error("Error posting product:", error);
    }
  }
  

  return (
    <div className="page-container">
      <h2 className="page-title">Game Details</h2>
      {products !== null ? (
        <div className="competition">
          <div className="competition-details">
            <img className="country-flag" src={product.image} alt="Country Flag" />
            <p>{product.name}: {product.name}</p>
          </div>
          <div className="date-container">
            <p className="date-game">{formattedDate}</p>
          </div>
          <div className="game-details">
            <div className="team-container">
              <div className="team-details">
                <img className="team-flag" src={product.image} alt="Home Team Crest" />
                <p>{product.image}</p>
              </div>
              <div>
                <p> vs </p>
              </div>
              <div className="team-details">
                <img className="team-flag" src={product.image} alt="Away Team Crest" />
                <p>{product.name}</p>
              </div>
            </div>
          </div>
          <div className="product-container">
            <p>products: {productCount}</p>
            <button onClick={handleDecrement}>-</button>
            <button onClick={handleIncrement}>+</button>
            <div className="add-button">
              <button onClick={handleAddToCart}>Add to Cart</button>
              {isAddedToCart && <p>products added to cart!</p>}
            </div>
          </div>
          <div className="match-link">
              <Link to={"/match"}>
                <button className="back-button">
                  Back
                </button>
              </Link>
          </div>
        </div>
      ) : (
        <p>Match not found or has ended.</p>
      )}
    </div>
  );
}
