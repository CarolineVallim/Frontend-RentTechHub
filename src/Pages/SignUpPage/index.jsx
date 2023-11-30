import axios from 'axios';

import {useState} from 'react';

import {useNavigate} from 'react-router-dom';

const API_URL = "http://localhost:5005";

function SignUpPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUpSubmit = (e) => {
        // Prevent default actions of the form submission e.g.: refreshing the page
        e.preventDefault();

        // Create a request body object
        const requestBody = {email, password, name};

        axios.post(`${API_URL}/auth/signup`, requestBody)
            .then(()=>{
                navigate('/login');
            })
            .catch((error)=>{
                const errorDescription = error.response.data.message;
                setError(errorDescription);
            })
    }

return(
    <div>
        <h1>Sign-up Page</h1>
        <form onSubmit = {handleSignUpSubmit}>
            <div> 
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div> 
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div> 
                <label>Username:</label>
                <input type="text" name="username" value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
            {error && <p>{error}</p>}
        </form>
    </div>)

}

export default SignUpPage;