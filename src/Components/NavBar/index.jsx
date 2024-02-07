import "./style.css"
import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import cartIcon from "../../assets/output-onlinepngtools.png"
import { AuthContext } from "../../Context/auth.context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, user, logOut } = useContext(AuthContext);

  const notify = () => toast("You're logged out!");

  const handleButtonClick = async () => {
    try {
      console.log(isLoggedIn)
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
  function logOutNoti(){
    logOut();
    notify();
  }

  let userDesc = '';
  if (user && user.type === 'Client') {
    userDesc = 'Client';
  } else if (user && user.type === 'Landlord') {
    userDesc = 'Landlord';
  }

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
        <Link to="/" className="link">
          <span x="30" y="15" fontSize="10" fill="#263238" fontWeight="400" className="text-logo">RentTechHub</span>
        </Link>
      <div className="right-menu">
        <Link to="/products" className="link">
          <p>Products</p>
        </Link>

        {isLoggedIn ? (
          <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user.imageProfile,
            }}
            className="transition-transform"
            description={userDesc}
            name={user.firstName}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="profile">
            <Link to="/profile">
              My Profile
            </Link>
          </DropdownItem>
          {userDesc === "Landlord" && (
            <DropdownItem>
              <Link to="/dashboard">
                Go to Dashboard
              </Link>
            </DropdownItem>
          )}
          <DropdownItem key="logout" color="danger" onClick={logOutNoti}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
        ) : (
          <Link to="/login" className="link">
            <Button className="register-button" isLoading={isLoading} onClick={handleButtonClick} style={{ backgroundColor: '#4CAF4F', color: 'white',}}>
              Login
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
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
      />
    </div>
  );
};

export default NavBar;