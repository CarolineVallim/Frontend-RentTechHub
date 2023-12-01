import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage/index.jsx'
import LoginPage from './Pages/Login/index.jsx'
import LogoutPage from './Pages/LogoutPage/index.jsx'
import Profile from './Pages/Profile/index.jsx'
import HomePage from './Pages/HomePage/index.jsx'
import AllProducts from './Pages/AllProductsPage/index.jsx'
import Cart from './Pages/Cart/index.jsx'
import Checkout from './Pages/Checkout/index.jsx'
import NavBar from './Components/NavBar/index.jsx'
import SingleProduct from './Pages/SingleProduct/index.jsx'

function App() {

  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/products" element={<AllProducts />}/>
        <Route path="/product/:id" element={<SingleProduct />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>

    </div>
  )
}

export default App
