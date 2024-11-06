import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import CardList from './CardList.jsx'
import Card from './Card.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import Signup from './Signup.jsx'
import axios from 'axios'

const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function App() {

  // Testiranje rada axiosa
/*   axios.get('api/users')
    .then(response => console.log(response.data))
 */


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
