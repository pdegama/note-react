import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
      <div className="navbar">
        <div className="nav-title">
          Note
        </div>
        <Link to="/logout">Login</Link>
      </div>
    </>
  )

}

export default Header

