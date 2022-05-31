import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config"
import { GetField } from "../../tools/getform"

function Register() {

  const onRegister = async (e) => {
    e.preventDefault()

    let v = [];
    let d = GetField(e)
    let error = ``
    let formErr = document.getElementById("form_error")
    let formSuc = document.getElementById("form_succe")
    let formBtn = document.getElementById("form_submin_button")
    formErr.classList.add("hide")
    formSuc.classList.add("hide")
    formBtn.setAttribute("disabled", "")

    if (d.fullname.length >= 1) {
      v.push(1)
    } else {
      error += `
      Fullname must be 1 or more than 1 character.<br />
      `
    }

    if (d.username.length >= 6) {
      if (d.username.match(/^[a-zA-Z0-9]+$/)) {
        // console.log("true");
        v.push(1)
      } else {
        // console.log("false");
        error += `
        Username allow only alphabet and numeric character<br />
        `
      }
    } else {
      error += `
      Username must be 6 or more than 6 character.<br />
      `
    }

    if (d.password.length >= 5) {
      v.push(1)
    } else {
      error += `
      Password must be 5 or more than 5 character.<br />
      `
    }

    setTimeout(async () => {
      if (v.length !== 3) {
        formErr.innerHTML = error;
        formBtn.removeAttribute("disabled")
        formErr.classList.remove("hide")
        return
      }

      // console.log("success");

      const json = JSON.stringify(d);

      const res = await axios.post(config.backend + 'auth/register', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.data.status) {
        formBtn.removeAttribute("disabled")
        formSuc.classList.remove("hide")
      } else if (res.data.exist) {
        formErr.innerHTML = "Username is already exist please change username";
        formBtn.removeAttribute("disabled")
        formErr.classList.remove("hide")
      };

    }, 1000)

  }

  return (
    <>
      <h1 className="auth-title">
        Note
      </h1>

      <div className="auth-con">
        <h2>
          Register
        </h2>
        <div id="form_error" className="alert alert-red hide"></div>
        <div id="form_succe" className="alert alert-green hide"></div>
        <form onSubmit={onRegister} className="auth-form">
          <div className="input-group my-15">
            <label for="fullname">Name:</label>
            <input type="text" id="fullname" placeholder="Full Name" name="fullname" />
          </div>
          <div className="input-group my-15">
            <label for="username">Username:</label>
            <input type="text" id="username" placeholder="Username" name="username" />
          </div>
          <div className="input-group my-15">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Password" name="password" />
          </div>
          <div className="my-15">
            <button type="submit" id="form_submin_button" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
        <Link to="/login" className="link">I have already account!</Link>
      </div>
    </>
  );
}

export default Register;
