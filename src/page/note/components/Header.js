import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
      <div className="navbar">
        <Link to="/note" className="nav-title">
          Note
        </Link>
        <div>
          <Link to="/note/new"><i class="bi bi-plus-square"></i></Link>
          <Link to="/setting"><i class="bi bi-gear"></i></Link>
          <Link to="/logout"><i class="bi bi-box-arrow-right"></i></Link>
        </div>
      </div>
    </>
  )

}

export default Header

