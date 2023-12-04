import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProviderWrapper } from './Context/auth.context.jsx';
import {NextUIProvider} from '@nextui-org/react'
import { CartProvider } from './Context/cart.context.jsx';
import store from '../src/redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <CartProvider>
        <NextUIProvider>
          <App />
        </NextUIProvider>
        </CartProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
);