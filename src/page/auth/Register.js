import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config"

function Rgister() {

  const onRegister = async (e) => {
    e.preventDefault()
    const json = JSON.stringify({ name: 'deven' });
    const res = await axios.post(config.backend + 'auth/register', json, {
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
          Register
        </h2>
        <form onSubmit={onRegister} className="auth-form">
          <div className="input-group my-15">
            <label for="fullname">Name:</label>
            <input type="text" id="fullname" placeholder="Full Name" />
          </div>
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
              Register
            </button>
          </div>
        </form>
        <Link to="/login" className="link">I have already account!</Link>
      </div>
    </>
  );
}

export default Rgister;
