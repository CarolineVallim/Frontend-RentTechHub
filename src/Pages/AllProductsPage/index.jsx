import "./index.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllProducts(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5005/api/products');
                console.log("Response from backend:", response.data);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError(error.response?.data?.message || error.message);
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    


    return(
        <div className="all-products-page">
            <div className="header-page">
                <h1>All Products</h1>
            </div>
            <div className="all-products-container">
                {products.map((product) => (
                
                <div className="product-container" key={product._id}>
                    <div>
                        <img className="product-image-section" src={product.image} />
                    </div>

                    <div className="product-name-section">
                        <h3>{product.name}</h3>
                    </div>
                    <div className="products-details">
                        <div className="price-details">
                            <p>Rent</p>
                            <p>€ {product.rentalPrice}/day</p>
                        </div>
                        <div className="see-more-link">
                            <Link to={`/products/${product._id}`}>
                            <p>See more</p>
                            </Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}