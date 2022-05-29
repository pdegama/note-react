import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <h1 class="auth-title">
        Note
      </h1>

      <div class="auth-con">
        <h2>
          Login
        </h2>
        <form class="auth-form" action="">
          <div class="input-group my-15">
            <label for="username">Username:</label>
            <input type="text" id="username" placeholder="Username" />
          </div>
          <div class="input-group my-15">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div class="my-15">
            <button class="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <Link to="/register" class="link">Don't have an account?</Link>
      </div>
    </>
  );
}

export default Login;
