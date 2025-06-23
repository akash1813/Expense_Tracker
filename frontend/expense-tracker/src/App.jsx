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
import UserProvider from './context/UserrContext'
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/income" element={<Income />} />


          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className:" ",
          style:{
            fontSize:'13px'
          },
        }}

      />

    </UserProvider>
  )
}

export default App


const Root = () => {

  //Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token')

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
};