import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
      <div className="navbar">
        <Link to="/note" className="nav-title">
          Note
        </Link>
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

