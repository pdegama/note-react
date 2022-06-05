import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Note from './note/Note'
import Login from './auth/Login'
import Logout from './auth/Logout'
import Register from './auth/Register'
import Error404 from './Error404'
import '../style/style.css'
import { useEffect, useState } from "react"
import { getCookie, deleteCookie } from "../tools/cookie"
import config from "../config"
import axios from 'axios'


function App() {

  let [getStatus, setStatus] = useState(false);

  const authTry = async () => {
    const json = JSON.stringify({});
    let t = getCookie("USER_TOKEN")
    if (t) {
      const res = await axios.post(config.backend + 'auth/', json, {
        headers: {
          'Content-Type': 'application/json',
          'Token': t
        }
      });
      
      if (!res.data.status) {
        deleteCookie("USER_TOKEN")
        if (window.location.pathname !== "/") {
          window.location.pathname = "/"
        }
      } else {
        setStatus(true);
      };
    } else {
      if (window.location.pathname !== "/") {
        window.location.pathname = "/"
      }
    }
  }

  useEffect(() => {
    authTry()
  }, [])


  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home mod={getStatus} />} />
        <Route exact path="/note/*" element={<Note />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
