import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config"

function Login() {

  const onLogin = async (e) => {
    e.preventDefault()
    const json = JSON.stringify({ name: 'deven' });
    const res = await axios.post(config.backend + 'auth/login', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.data);
  }

  return (
    <>
      <h1 className="auth-title">
        Note
      </h1>

      <div className="auth-con">
        <h2>
          Login
        </h2>
        <form onSubmit={onLogin} className="auth-form">
          <div className="input-group my-15">
            <label for="username">Username:</label>
            <input type="text" id="username" placeholder="Username" />
          </div>
          <div className="input-group my-15">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="my-15">
            <button type="submit" className="btn btn-primary">
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
