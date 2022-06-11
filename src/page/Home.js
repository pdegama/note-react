import { Link } from "react-router-dom"

const Home = (e) => {

  return (
    <>

      <div className="navbar">
        <a href="/" className="nav-title">
          Note
        </a>
        <div>
          {(() => {
            if (!e.mod) {
              return (
                <>
                  <Link to="/login">Login</Link>
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  <Link to="/register">Register</Link>
                </>
              )
            } else {
              return (
                <>
                  <Link to="/note">Your Notes</Link>
                </>
              )
            }
          })()}
        </div>
      </div>

      <div className="div-center">
        <h1 className="hello">
          Hello, World!
        </h1>

        {(() => {
          if (!e.mod) {
            return (
              <>
                <br />
                <Link className="btn btn-primary hello-button" to="/register">Register</Link>
                <br />
                <br />
                <Link className="link" to="/login">Login</Link>
              </>
            )
          } else {
            return (
              <>
                <br />
                <Link className="btn btn-primary hello-button" to="/note">Go To Note</Link>
              </>
            )
          }
        })()}
      </div>

    </>
  )

}

export default Home