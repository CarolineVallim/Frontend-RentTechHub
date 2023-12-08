import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage/index.jsx'
import LoginPage from './Pages/Login/index.jsx'
import LogoutPage from './Pages/LogoutPage/index.jsx'
import Profile from './Pages/Profile/index.jsx'
import HomePage from './Pages/HomePage/index.jsx'
import AllProducts from './Pages/AllProductsPage/index.jsx'
import Cart from './Pages/Cart/index.jsx'
import NavBar from './Components/NavBar/index.jsx'
import SingleProduct from './Pages/SingleProduct/index.jsx'
import StorePage from './Pages/StoreDashboard/index.jsx'
import Payment from './Pages/Payment/index.jsx'
import Completion from './Pages/CompletionPage/index.jsx'
import Footer from './Components/Footer/index.jsx'

function App() {

  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/products" element={<AllProducts />}/>
        <Route path="/products/:id" element={<SingleProduct />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/store' element={<StorePage />} />
        <Route path='/payment/:cartId' element={<Payment />} />
        <Route path='/completion' element={<Completion />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
