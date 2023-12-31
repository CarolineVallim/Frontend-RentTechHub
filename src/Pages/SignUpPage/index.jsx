import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Spacer, Link, Select, SelectItem } from '@nextui-org/react';

const API_URL = 'https://rent-tech-hub.adaptable.app/';

function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Client');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const accountTypes = ['Client', 'Landlord', 'Deliverer'];
  const disableTypes = ['Deliverer'];

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !email || !password || !address || !type) {
      setError('All fields are required');
      return;
    }
  
    const typeValue = type?.value || type;
    const requestBody = { firstName, lastName, email, password, address, type: typeValue };
  
    console.log('Request Body:', requestBody);
  
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Server error:', error);
        const errorDescription = error.response?.data?.message || 'An error occurred';
        setError(errorDescription);
      });
  };
  
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md" style={{ borderRadius: "25px", padding: "20px", width: "60%" }}>
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-500" style={{ fontSize: "24px", marginBottom: "15px" }}>Sign-up for RentTechHub</h1>
        <form onSubmit={handleSignUpSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" style={{marginTop:"10px"}}>First Name:</label>
            <Input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
              bordered
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" style={{marginTop:"10px"}}>Last Name:</label>
            <Input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
              bordered
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" style={{marginTop:"10px"}}>Email:</label>
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
            <label className="block text-sm font-medium text-gray-700" style={{marginTop:"10px"}}>Password:</label>
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
          <div>
            <label className="block text-sm font-medium text-gray-700" style={{marginTop:"10px"}}>Account Type:</label>
            <Select
              disabledKeys={disableTypes}
              label="Account Type"
              placeholder="Select your account type"
              value={type}
              className="max-w-xs"
              onChange={(e) => setType(e.target.value)}
            >
              {accountTypes.map((accountType) => (
                <SelectItem key={accountType} value={accountType}>
                  {accountType}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" style={{marginTop:"10px"}}>Address:</label>
            <Input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              isRequired
              bordered
              fullWidth
            />
          </div>
          <Spacer y={1} />
          <div>
            <Button type="submit" auto style={{ backgroundColor: "#4CAF4F", color: "white", marginTop:"10px", marginBottom:"5px"}}>
              Sign Up
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <Spacer y={1} />
        <div className="text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <Link href="/login" underline="hover">Login Here</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
