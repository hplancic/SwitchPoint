import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import Login from './Login.jsx'
import Home from './Home.jsx'
import Signup from './Signup.jsx'
import axios from 'axios'
import LoggedInHome from './LoggedInHome.jsx'
import MyPage from './MyPage.jsx'

const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function App() {

  const title = 'SwitchPoint';

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) || {username:'username', isLoggedIn:false});

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);
  // Testiranje rada axiosa
/*   axios.get('api/users')
    .then(response => console.log(response.data))
 */

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
              auth.isLoggedIn ? <LoggedInHome title={title} auth={auth} setAuth={setAuth}/> : <Home title={title} />
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
