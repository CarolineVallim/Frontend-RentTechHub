import "./index.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Slider } from "@nextui-org/react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/products');
        console.log("Response from backend:", response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Handle error appropriately
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const filteredProducts = products.filter((product) => {
    const rentalPrice = product.rentalPrice;
    return rentalPrice >= priceRange[0] && rentalPrice <= priceRange[1];
  });
  
  return (
    <>
      <div className="all-products-page" style={{ paddingTop: '95px' }}>
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/5 p-4 bg-gray-200 shadow-md" style={{ minWidth: '20%' }}>
            <h2 className="text-lg font-semibold mb-4" style={{fontFamily: 'Verdana, Geneva, Tahoma, sans-serif', marginBottom:'10px'}}>Filters</h2>
            <div className="mb-2">
              <div className="slider" style={{fontFamily:"Verdana, Geneva, Tahoma, sans-serif"}}>
              <Slider
                label="Price Range"
                step={1}
                minValue={1}
                maxValue={100}
                formatOptions={{style: "currency", currency: "USD"}}
                defaultValue={priceRange}
                onChange={(value) => setPriceRange(value)}
              />
              </div>
            </div>
          </div>
  
          <div className="w-4/5 p-4 flex flex-wrap" style={{ justifyContent: 'space-around', marginLeft: '50px', marginRight:'50px' }}>
            {filteredProducts.map((product, index) => (
                <div
                className="product-container"
                key={product._id}
                style={{
                    flexBasis: '300px',
                    marginBottom: '20px',
                    marginRight:'25px',
                    marginLeft:'25px',
                    boxSizing: 'border-box',
                    paddingRight:'25px',
                    paddingLeft:'25px'
                }}
                >
                <div>
                  <img
                    className="product-image-section"
                    src={product.image}
                    alt={product.name}
                  />
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
                    <Button
                      isLoading={isLoading}
                      onClick={handleButtonClick}
                      style={{ backgroundColor: '#4CAF4F', color: 'white' }}
                    >
                      <Link to={`/products/${product._id}`}>
                        <p>See more</p>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}