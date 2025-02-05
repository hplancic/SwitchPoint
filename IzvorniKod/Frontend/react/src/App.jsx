import { useContext, useEffect, useState, createContext } from 'react'
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
import DeleteUsers from './My Page/DeleteUsers.jsx'

export const ThemeContext = createContext(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark");

function App() {

  const title = 'SwitchPoint';

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) || {username:'username', isLoggedIn:false});
  const theme = useContext(ThemeContext);

  const [tabs, setTabs] = useState({
    'Moje ploče':<MojePloce />,
    'Ponude':<Ponude />,
    'Popis želja':<PopisZelja />,
    'Postavke':<Postavke />
  });
  const [selectedTab, setSelectedTab] = useState(Object.keys(tabs)[0]);

  {auth.username=="admin" ? tabs["Korisnici"] = <DeleteUsers /> : null}

  useEffect(() => {
    if (localStorage.getItem("theme") == null) localStorage.setItem("theme", "dark");
    document.body.classList.remove(theme=="dark" ? "light" : "dark");
    document.body.classList.add(theme);
  }, []);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<LoggedInHome 
                                      title={title} 
                                      auth={auth} 
                                      setAuth={setAuth} />} />
            <Route path='/mypage' element={<MyPage title={title} auth={auth} setAuth={setAuth} tabs={tabs} 
                                              selectedTab={selectedTab} setSelectedTab={setSelectedTab} tab={"Moje ploče"} />} />
            <Route path='/ponude' element={<MyPage title={title} auth={auth} setAuth={setAuth} tabs={tabs} 
                                              selectedTab={selectedTab} setSelectedTab={setSelectedTab} tab={"Ponude"} />} />
            <Route path='/popis-zelja' element={<MyPage title={title} auth={auth} setAuth={setAuth} tabs={tabs} 
                                              selectedTab={selectedTab} setSelectedTab={setSelectedTab} tab={"Popis želja"} />} />
            <Route path='/postavke' element={<MyPage title={title} auth={auth} setAuth={setAuth} tabs={tabs} 
                                              selectedTab={selectedTab} setSelectedTab={setSelectedTab} tab={"Postavke"} />} />
            {auth.username=="admin" && <Route path="/korisnici" element={<MyPage title={title} auth={auth} setAuth={setAuth} tabs={tabs} 
                                                  selectedTab={selectedTab} setSelectedTab={setSelectedTab} tab={"Korisnici"} />} />}
            {!auth.isLoggedIn &&
              <>
                <Route path='/login' element={<Login setAuth={setAuth} title={title}/>}/>
                <Route path='/signup' element={<Signup setAuth={setAuth} title={title}/>}/>
              </>
            }
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </>
  )
}

export default App
