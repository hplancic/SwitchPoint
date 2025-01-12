import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import Login from './Login and Signup/Login.jsx'
import Signup from './Login and Signup/Signup.jsx'
import axios from 'axios'
import LoggedInHome from './Front Page/LoggedInHome.jsx'
import MyPage from './My Page/MyPage.jsx'
import MojePloce from './My Page/MojePloce.jsx'
import Ponude from './My Page/Ponude.jsx'
import PopisZelja from './My Page/PopisZelja.jsx'
import Postavke from './My Page/Postavke.jsx'

function App() {

  const title = 'SwitchPoint';

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) || {username:'username', isLoggedIn:false});

  const [tabs, setTabs] = useState({
    'Moje ploče':<MojePloce />,
    'Ponude':<Ponude />,
    'Popis želja':<PopisZelja />,
    'Postavke':<Postavke />
  });
  const [selectedTab, setSelectedTab] = useState(Object.keys(tabs)[0]);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoggedInHome 
                                    title={title} 
                                    auth={auth} 
                                    setAuth={setAuth} />} />
          {auth.isLoggedIn &&
            <>
              <Route path='/mypage' element={<MyPage title={title} auth={auth} setAuth={setAuth} tabs={tabs} 
                                                selectedTab={selectedTab} setSelectedTab={setSelectedTab} tab={"Moje ploče"} />} />
              <Route path='/ponude' element={<MyPage title={title} auth={auth} setAuth={setAuth} tabs={tabs} 
                                                selectedTab={selectedTab} setSelectedTab={setSelectedTab} tab={"Ponude"} />} />
              <Route path='/popis-zelja' element={<MyPage title={title} auth={auth} setAuth={setAuth} tabs={tabs} 
                                                selectedTab={selectedTab} setSelectedTab={setSelectedTab} tab={"Popis želja"} />} />
              <Route path='/postavke' element={<MyPage title={title} auth={auth} setAuth={setAuth} tabs={tabs} 
                                                selectedTab={selectedTab} setSelectedTab={setSelectedTab} tab={"Postavke"} />} />
            </>
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
