import {useContext, useState} from 'react';
import { AuthContext } from '../../Context/auth.context';
import axios from 'axios';
import "./styles.css"

import {useNavigate} from 'react-router-dom';

const API_URL = "http://localhost:5005";

function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // use shared functions provided by AuthContext 
    const {storeToken, authenticateUser} = useContext(AuthContext);

    const handleLoginSubmit = (e) =>{
        e.preventDefault();

        const requestBody = {email, password};

        axios.post(`${API_URL}/auth/login`, requestBody)
            .then((response)=>{
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/');
            })
            .catch((error)=>{
                const errorDescription = error.response.data.message; 
                setError(errorDescription);
            })

    }
    
    return(<div className='first-div'>
        <h1>Login Page</h1>
        <form onSubmit = {handleLoginSubmit}>
            <div> 
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div> 
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            {error && <p>{error}</p>}
        </form>
    </div>)

}

export default LoginPage