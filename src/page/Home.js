import { Link } from "react-router-dom"

const Home = (e) => {

  return (
    <>

      <h1>
        Hello, I Am Note!
      </h1>

      {(() => {
        if (!e.mod) {
          return (
            <>
              <br />
              <Link className="btn btn-primary" to="/login">Login</Link>
              <br />
              <br />
              <Link className="link" to="/register">Register</Link>
            </>
          )
        } else {
          return (
            <>
              <br />
              <Link className="btn btn-primary" to="/note">Go To Note</Link>
            </>
          )
        }
      })()}
      
    </>
  )

}

export default Home