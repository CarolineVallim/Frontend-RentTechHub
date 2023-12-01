// import "./index.css";
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
        <div>
            <div>
                <h1>All Products</h1>
            </div>
            <div>
                {products.map((product) => (
                
                <div className="match-container" key={product._id}>
                <div>
                    <img className="competition-flag" src={product.image} />
                </div>

                <div className="competition-section">
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                </div>

                <div className="buy-section">
                    <Link to={`/products/${product._id}`}>
                    <p>See more</p>
                    </Link>
                </div>
                </div>
                ))}
            </div>
        </div>
    )
}