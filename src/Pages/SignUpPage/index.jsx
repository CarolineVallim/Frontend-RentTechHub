import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Spacer } from '@nextui-org/react';

const API_URL = 'http://localhost:5005';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setError(errorDescription);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-500">Sign-up for RentTechHub</h1>
        <form onSubmit={handleSignUpSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <Input
              type="text"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              required
              bordered
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
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
            <label className="block text-sm font-medium text-gray-700">Password:</label>
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
            <Button type="submit" auto>
              Sign Up
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <Spacer y={1} />
        <div className="text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-green-500">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
