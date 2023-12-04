import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Spacer, Link } from '@nextui-org/react';
import { AuthContext } from '../../Context/auth.context';


const API_URL = 'http://localhost:5005';

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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md" style={{ borderRadius: '25px', padding: '20px', width: '60%' }}>
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-500" style={{ fontSize: '24px', marginBottom: '15px' }}>
          Login to RentTechHub
        </h1>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" style={{ marginTop: '10px' }}>
              Email:
            </label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              bordered
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" style={{ marginTop: '10px' }}>
              Password:
            </label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              bordered
              fullWidth
            />
          </div>
          <Spacer y={1} />
          <div>
            <Button type="submit" auto style={{ backgroundColor: '#4CAF4F', color: 'white', marginTop: '10px', marginBottom: '5px' }}>
              Login
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <Spacer y={1} />
        <div className="text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link href="/signup" underline="hover">
            Sign Up Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
