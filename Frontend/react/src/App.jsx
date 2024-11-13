import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import Login from './Login and Signup/Login.jsx'
import Home from './Front Page/Home.jsx'
import Signup from './Login and Signup/Signup.jsx'
import axios from 'axios'
import LoggedInHome from './Front Page/LoggedInHome.jsx'
import MyPage from './My Page/MyPage.jsx'

function App() {

  const title = 'SwitchPoint';

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) || {username:'username', isLoggedIn:false});

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
              auth.isLoggedIn ? <LoggedInHome 
                                    title={title} 
                                    auth={auth} 
                                    setAuth={setAuth} /> 
                              : <Home title={title} />
          } />
          {auth.isLoggedIn &&
            <Route path='/mypage' element={<MyPage title={title} auth={auth} setAuth={setAuth} />} />
          } 
          {!auth.isLoggedIn &&
            <>
            <Route path='/login' element={<Login setAuth={setAuth} title={title}/>}/>
            <Route path='/signup' element={<Signup setAuth={setAuth} title={title}/>}/>
            </>
          }
        </Routes>
      </Router>
    </>
  )
}

export default App
