import "./style.css"
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, User } from "@nextui-org/react";
import cartIcon from "../../assets/output-onlinepngtools.png"

const NavBar = ({ isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userName = 'MUDAR PARA NOME DO USER'

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
  return (
    <div className="header">
        <Link to="/" className="link">
            <svg width="40" height="27" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo">
                <g id="Icon">
                <path id="Vector" d="M13.3106 9.17109L9.55812 15.5978L5.80569 9.17109H13.3106ZM14.3159 8.59668H4.79636L9.55812 16.7346L14.3159 8.59668Z" fill="#263238"/>
                <path id="Vector_2" d="M19.8347 1.17808L23.5871 7.60481H16.0822L19.8347 1.17808ZM19.8347 0.0292969L15.0729 8.16715H24.5964L19.8347 0.0292969Z" fill="#263238"/>
                <path id="Vector_3" d="M0.234009 0.0292969L4.2266 7.22725L8.58952 0.210039L0.234009 0.0292969Z" fill="#4CAF4F"/>
                <path id="Vector_4" d="M9.55822 0.659668L13.7462 7.81746H5.36215L9.55822 0.659668Z" fill="#4CAF4F"/>
                <path id="Vector_5" d="M14.8247 9.38037L19.0167 16.735H10.4332L14.6944 9.38037H14.8247Z" fill="#4CAF4F"/>
                <path id="Vector_6" d="M15.7322 8.93408L19.8347 16.1762L23.9941 8.93408H15.7322Z" fill="#4CAF4F"/>
                </g>
        </svg>
        </Link>
        <text x="30" y="15" fontSize="10" fill="#263238" className="text-logo">RentTechHub</text>
      <div className="right-menu">
        <Link to="/products" className="link">
          <p>Products</p>
        </Link>

        {isLoggedIn ? (
          <Link to="/profile">
              <User
                name={userName}
                description="Customer"
                avatarProps={{
                  src: "MUDAR PARA USER PHOTO"
                }}
              />
          </Link>
        ) : (
          <Link to="/signup" className="link">
            <Button className="register-button" isLoading={isLoading} onClick={handleButtonClick} style={{ backgroundColor: '#4CAF4F', color: 'white',}}>
              Register Now
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                <path d="M6.52569 5.47021L8.2448 3.75111C8.44868 3.54723 8.44868 3.21667 8.2448 3.0128L6.52569 1.29369M8.09189 3.38195L0.434936 3.38195" stroke="white" strokeWidth="0.765676" strokeLinecap="round" />
              </svg>
            </Button>
          </Link>
        )}
        <Link to="/cart" className="link">
          <img className="cartIcon"src={cartIcon}/>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;