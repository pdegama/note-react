import { useEffect } from "react"
import { getCookie, deleteCookie } from "../../tools/cookie"
import config from "../../config"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setLogOutState } from '../../reducers/logoutstate'

const Logout = () => {

  let navigate = useNavigate()
  const dispatch = useDispatch()

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
    dispatch(setLogOutState());
    navigate("/")
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
