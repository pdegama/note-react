import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config"
import { GetField } from "../../tools/getform"
import { setCookie } from "../../tools/cookie"

function Login() {

  const onLogin = async (e) => {
    e.preventDefault()

    let v = [];
    let d = GetField(e)
    let error = ``
    let formErr = document.getElementById("form_error")
    let formBtn = document.getElementById("form_submin_button")
    formErr.classList.add("hide")
    formBtn.setAttribute("disabled", "")

    if (d.username.length >= 1) {
      v.push(1)
    } else {
      error += `
      Please enter username.<br />
      `
    }

    if (d.password.length >= 1) {
      v.push(1)
    } else {
      error += `
      Plese enter password.<br />
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

      const res = await axios.post(config.backend + 'auth/login', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.data.status) {
        formBtn.removeAttribute("disabled")
        setCookie("USER_TOKEN", res.data.token)
        window.location = "/note"
        e.target.reset()
      } else if (!res.data.status) {
        formErr.innerHTML = "Username or Password is invalid.";
        formBtn.removeAttribute("disabled")
        formErr.classList.remove("hide")
      };

    }, 1000)

  }

  return (
    <>
      <Link to="/">
        <h1 className="auth-title">
          Note
        </h1>
      </Link>

      <div className="auth-con">
        <h2>
          Login
        </h2>
        <form onSubmit={onLogin} className="auth-form">
          <div id="form_error" className="alert alert-red hide"></div>
          <div className="input-group my-15">
            <label for="username" >Username:</label>
            <input type="text" id="username" placeholder="Username" name="username" />
          </div>
          <div className="input-group my-15">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Password" name="password" />
          </div>
          <div className="my-15">
            <button type="submit" id="form_submin_button" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <Link to="/register" className="link">Don't have an account?</Link>
      </div>
    </>
  );
}

export default Login;
