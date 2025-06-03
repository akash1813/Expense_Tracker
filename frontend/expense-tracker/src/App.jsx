import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import SignUp from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import Home from './pages/Dashboard/Home'
import Expense from './pages/Dashboard/Expense'
import Income from './pages/Dashboard/Income'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}  />
          <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/dashboard" element={<Home />} />
         <Route path="/expenses" element={<Expense />} />
         <Route path="/income" element={<Income />} />
         

        </Routes>
      </Router>
    </div>
  )
}

export default App


const Root = () => {

  //Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token')

  return isAuthenticated ?(
    <Navigate to= "/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
};