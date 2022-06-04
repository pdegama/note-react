import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
      <div className="navbar">
        <div className="nav-title">
          Note
        </div>
        <div>
          <Link to="/setting">Settings</Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    </>
  )

}

export default Header

