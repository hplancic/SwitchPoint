import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import CardList from './CardList.jsx'
import Card from './Card.jsx'

function App() {

  return (
    <>
      <Header />
      <div className='content'>
        <Sidebar />
        <CardList />
      </div>
    </>
  )
}

export default App
