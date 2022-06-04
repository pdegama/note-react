import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCookie, deleteCookie } from "../tools/cookie"
import config from "../config"
import axios from 'axios'

const Home = () => {

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
      } else {
        setStatus(true);
      };
    }
  }

  useEffect(() => {
    authTry()
  }, [])

  return (
    <>

      <h1>
        Hello, I Am Note!
      </h1>

      {(() => {
        if (!getStatus) {
          return (
            <>
              <br />
              <Link className="btn btn-primary" to="/login">Login</Link>
              <br />
              <br />
              <Link className="link" to="/register">Register</Link>
            </>
          )
        } else {
          return (
            <>
              <br />
              <Link className="btn btn-primary" to="/note">Go To Note</Link>
            </>
          )
        }
      })()}



    </>
  )

}

export default Home