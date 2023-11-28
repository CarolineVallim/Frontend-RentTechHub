import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/Login'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>

    </div>
  )
}

export default App
