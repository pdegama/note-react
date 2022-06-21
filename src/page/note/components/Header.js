import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
      <div className="navbar">
        <a href="/note" className="nav-title">
          Note<snap id="tab"></snap>
        </a>
        <div>
          <Link to="/note/new"><i class="bi bi-plus-square"></i></Link>
          <Link to="/note/setting"><i class="bi bi-gear"></i></Link>
          <Link to="/logout"><i class="bi bi-box-arrow-right"></i></Link>
        </div>
      </div>
    </>
  )

}

export default Header

