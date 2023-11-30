import { Button } from "@nextui-org/react"
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./styles.css";
import image from "../../assets/section-image.png";
import firsticon from "../../assets/first-icon.png"
import secondicon from "../../assets/second-icon.png"
import thirdicon from "../../assets/third-icon.png"

export default function HomePage(){
    const [isLoading, setIsLoading] = useState(false);
  
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

    return(
    <>
        <section className="first-section">
            <div className="register-frame">
            <div className="main-h1">
                <span className="black-text">RentTech</span>
                <span className="green-text">Hub</span>
            </div>

                <Link to="/signup">
                <Button
                    className="register-button"
                    isLoading={isLoading}
                    onClick={handleButtonClick}
                    style={{display: 'flex', padding: '16px 36px', justifyContent: 'center', alignItems: 'center',
                        gap: '11px', borderRadius: '4.5px', background: 'var(--brand-primary, #4CAF4F)',color: 'white',}}>
                    Register
                </Button>
                </Link>
            </div>
            <img className="section-image" src={image}/>
        </section>
        <section className="second-section">
            <div className="title-div">
                <p className="title">Rent Products for your needs<br />in our community marketplace</p>
            </div>
        </section>
        <section className="third-section">
            <div className="first-square">
                <img className="first-icon" src={firsticon} />
                <p className="first-title">Community<br/> Marketplace</p>
                <p className="first-text">Explore our community-driven rent marketplace — simplicity meets collaboration. Rent, renew, and pay effortlessly with the power in your hands.</p>
            </div>
            <div className="second-square">
                <img className="second-icon" src={secondicon}/>
                <p className="second-title">Everything you<br/>would ever need</p>
                <p className="second-text">Whether you've lost something and need a quick replacement or simply want to avoid the hassle of transporting it, renting makes it easier.</p>
            </div>
            <div className="third-square">
                <img className="third-icon" src={thirdicon}/>
                <p className="third-title">Help the<br/>environment</p>
                <p className="third-text">Don't throw it away—loan it! Make an eco-friendly choice by offering what you no longer need to someone who does.</p>
            </div>
        </section>
    </>
    )
}