import React, { useEffect, useState } from 'react';
import { GetField } from "../../tools/getform"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { getCookie } from "../../tools/cookie"
import config from '../../config'
import Alert from "../Alert"

const Settings = () => {

  const getData = async () => {
    const json = JSON.stringify({});
    let t = getCookie("USER_TOKEN")
    const res = await axios.post(config.backend + `pref/get`, json, {
      headers: {
        'Content-Type': 'application/json',
        'Token': t
      }
    });

    if (res.data.status) {
      document.getElementById("fullname").setAttribute("value", res.data.fullname)
      document.getElementById("username").setAttribute("value", res.data.username)
      document.getElementById("load_circle").classList.add("hide")
    } else {
      window.location = "/"
    }

  }

  useEffect(() => {
    document.getElementById("tab").innerHTML = "/settings"
    getData()
  }, [])

  let [nameAlertState, setNameAlertState] = useState(false);
  let [passAlertState, setPassAlertState] = useState(false);

  const updateName = async (e) => {
    e.preventDefault()
    let v = [];
    let error = ``
    let d = GetField(e)
    let formErr = document.getElementById("name_error")
    let formBtn = document.getElementById("name_submin_button")
    formErr.classList.add("hide")
    setNameAlertState(false)
    setPassAlertState(false)
    formBtn.setAttribute("disabled", "")

    if (d.fullname.length >= 1) {
      v.push(1)
    } else {
      error += `
      Please enter title.<br />
      `
    }

    setTimeout(async () => {
      if (v.length !== 1) {
        formErr.innerHTML = error;
        formBtn.removeAttribute("disabled")
        formErr.classList.remove("hide")
        return
      }

      const json = JSON.stringify(d);
      let t = getCookie("USER_TOKEN")
      const res = await axios.post(config.backend + 'pref/name', json, {
        headers: {
          'Content-Type': 'application/json',
          'Token': t
        }
      });

      if (!res.data.status) {
        window.location = "/"
      }

      setNameAlertState(true)
      setTimeout(() => {
        setNameAlertState(false)
      }, 7000)

      formBtn.removeAttribute("disabled")
    }, 1000)

  }

  const updatePass = async (e) => {
    e.preventDefault()
    let v = [];
    let error = ``
    let d = GetField(e)
    let formErr = document.getElementById("pass_error")
    let formBtn = document.getElementById("pass_submin_button")
    formErr.classList.add("hide")
    setNameAlertState(false)
    setPassAlertState(false)
    formBtn.setAttribute("disabled", "")

    if (d.curpass.length >= 1) {
      v.push(1)
    } else {
      error += `
      Please enter current password.<br />
      `
    }

    if (d.newpass.length >= 5) {
      v.push(1)
    } else {
      error += `
      New Password must be 5 or more than 5 character.<br />
      `
    }

    setTimeout(async () => {
      if (v.length !== 2) {
        formErr.innerHTML = error;
        formBtn.removeAttribute("disabled")
        formErr.classList.remove("hide")
        return
      }

      const json = JSON.stringify(d);
      let t = getCookie("USER_TOKEN")
      const res = await axios.post(config.backend + 'pref/pass', json, {
        headers: {
          'Content-Type': 'application/json',
          'Token': t
        }
      });

      if (!res.data.status && res.data.curpass) {
        error = `
        Current password not match
        `
        formErr.innerHTML = error
        formErr.classList.remove("hide")
      } else if (!res.data.status) {
        window.location = "/"
      } else if (res.data.status) {
        e.target.reset()
        setPassAlertState(true)
        setTimeout(() => {
          setPassAlertState(false)
        }, 7000)
      }

      formBtn.removeAttribute("disabled")

    }, 1000)

  }

  return (
    <>
      <div className='load-circle' id='load_circle'>
        <div></div>
      </div>
      <Alert show={nameAlertState} event={() => setNameAlertState(false)} massage={"Name Change Successful"} color={"green"} />
      <Alert show={passAlertState} event={() => setPassAlertState(false)} massage={"Password change successful"} color={"green"} />
      <div className='con'>
        <div className="space-2"></div>
        <h1 className='sub-sub-title'>Change Name</h1>
        <form onSubmit={updateName}>
          <div id="name_error" className="alert alert-red hide"></div>

          <div className="input-group my-15">
            <label>Name:</label>
            <input type="text" id="fullname" placeholder="Name" name="fullname" />
          </div>

          <div className="input-group my-15">
            <label>Username:</label>
            <input type="text" disabled id="username" placeholder="Username" />
          </div>

          <button type='submit' id='name_submin_button' className='btn btn-primary'>
            Save
          </button>
        </form>
        <div className="space-2"></div>
        <hr />
        <div className="space-3"></div>
        <h1 className='sub-sub-title'>Password Manage</h1>
        <form onSubmit={updatePass}>
          <div id="pass_error" className="alert alert-red hide"></div>

          <div className="input-group my-15">
            <label>Current Password:</label>
            <input type="password" id="current" placeholder="Current Password" name="curpass" />
          </div>

          <div className="input-group my-15">
            <label>New Password:</label>
            <input type="password" id="password" placeholder="New Password" name="newpass" />
          </div>

          <button type='submit' id='pass_submin_button' className='btn btn-primary'>
            Change Password
          </button>
        </form>
      </div>
    </>
  )
}

export default Settings
