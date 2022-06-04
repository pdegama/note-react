import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCookie, deleteCookie } from "../../tools/cookie"
import config from "../../config"
import axios from 'axios'

const Logout = () => {

  const logoutTry = async () => {
    const json = JSON.stringify({});
    let t = getCookie("USER_TOKEN")
    if (t) {
      const res = await axios.post(config.backend + 'auth/logout', json, {
        headers: {
          'Content-Type': 'application/json',
          'Token': t
        }
      });
      if (!res.data.status) {
        deleteCookie("USER_TOKEN")
      }
    }
    window.location = "/"
  }
  
  useEffect(() => {
    logoutTry()
  }, [])

  return (
    <>

    </>
  )
}

export default Logout
