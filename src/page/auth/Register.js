import { Link } from "react-router-dom";

function Rgister() {
  return (
    <>
      <h1 class="auth-title">
        Invoice
      </h1>

      <div class="auth-con">
        <h2>
          Register
        </h2>
        <form class="auth-form" action="">
          <div class="input-group my-15">
            <label for="fullname">Name:</label>
            <input type="text" id="fullname" placeholder="Full Name" />
          </div>
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
              Register
            </button>
          </div>
        </form>
        <Link to="/login" class="link">I have already account!</Link>
      </div>
    </>
  );
}

export default Rgister;
