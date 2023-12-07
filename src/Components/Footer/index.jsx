import { Link } from "react-router-dom"
import React from "react"
import logo1 from "../../assets/linkedin.png"
import logo2 from "../../assets/github.png"
import icon from "../../assets/icon.svg"
import "./styles.css"

export default function Footer(){
    return(
        <div className="footer">
            <div className="footer-lda">
                <div className="footer-lda-logo">
                    <img src={icon}/> <p>RentTechHub</p>
                </div>
                <div className="footer-lda-text">
                <p>
                   © 2023. RentTechHub Lda.
                </p>
                </div>
            </div>
            <div className="socials-carol">
                <p>Caroline</p>
                <a href="https://www.linkedin.com/in/carolinecvallim/" target="_blank">
                    <img src={logo1}/>
                </a>
                <a href="https://github.com/CarolineVallim" target="_blank">
                    <img src={logo2}/>
                </a>
            </div>
            <div className="socials-eu">
                <p>Guilherme</p>
                <a href="https://www.linkedin.com/in/guilherme-manso-silva/" target="_blank">
                    <img src={logo1}/>
                </a>
                <a href="https://github.com/51V3" target="_blank">
                    <img src={logo2}/>
                </a>
            </div>
        </div>
    )
}