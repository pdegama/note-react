import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setCookie, getCookie } from "../../../tools/cookie"

const Header = () => {

  useEffect(() => {
    let themeBtn = document.getElementById("theme_btn")
    let theme = getCookie("USER_THEME")
    if (theme === "dark") {
      document.body.classList.add("dark")
      themeBtn.innerHTML = `<i class="bi bi-sun"></i>`
    } else {
      document.body.classList.remove("dark")
      themeBtn.innerHTML = `<i class="bi bi-moon"></i>`
    }
  }, [])

  const changeTheme = (e) => {
    let themeBtn = document.getElementById("theme_btn")
    let body = document.body
    console.log(body);
    let theme = getCookie("USER_THEME")
    if (theme === "dark") {
      themeBtn.innerHTML = `<i class="bi bi-moon"></i>`
      body.classList.remove("dark")
      setCookie("USER_THEME", "light")
    } else {
      themeBtn.innerHTML = `<i class="bi bi-sun"></i>`
      body.classList.add("dark")
      setCookie("USER_THEME", "dark")
    }
  }

  return (
    <>
      <div className="navbar">
        <a href="/note" className="nav-title">
          Note<snap id="tab"></snap>
        </a>
        <div>
          <Link to="/note/new"><i class="bi bi-plus-square"></i></Link>
          <Link to="/note/setting"><i class="bi bi-gear"></i></Link>
          <button onClick={changeTheme} id="theme_btn"><i class="bi bi-moon"></i></button>
          <Link to="/logout"><i class="bi bi-box-arrow-right"></i></Link>
        </div>
      </div>
    </>
  )

}

export default Header

