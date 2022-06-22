import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getCookie } from "../../tools/cookie"
import config from '../../config'
import axios from "axios"
import { GetField } from "../../tools/getform"
import Alert from "../Alert"
import { useSelector, useDispatch } from 'react-redux'
import { clearLogInState } from '../../reducers/loginstate'
import { clearRegisterState } from '../../reducers/registerstate'

const NoteHome = () => {
  let { q } = useParams()

  let [getState, setState] = useState([]);
  let [searchState, setSearchState] = useState(false);
  let [qState, setQState] = useState(false);

  const loginStateSele = useSelector(state => state.loginstate.value)
  const registerStateSele = useSelector(state => state.registerstate.value)
  const dispatch = useDispatch()

  let [loginState, setLoginState] = useState(false)
  let [registerState, setRegisterState] = useState(false)

  const getNotes = async () => {
    const json = JSON.stringify({});
    let t = getCookie("USER_TOKEN")
    const res = await axios.post(config.backend + `note/all`, json, {
      headers: {
        'Content-Type': 'application/json',
        'Token': t
      }
    });
    if (res.data.status) {
      setState(res.data.data)
    }
  }

  const searchNote = async (e) => {

    let d = {};

    if (e) {
      e.preventDefault()
      d = GetField(e)
      window.history.pushState("", "", "/note/" + d.query)
    }

    if (!e && q) {
      d.query = q
      document.getElementById("s_field").setAttribute("value", q)
    } else if (d.query === "") {
      setSearchState(false)
      getNotes()
      return;
    }

    setSearchState(true)
    setQState(d.query)
    let loadCircle = document.getElementById("load_circle")
    loadCircle.classList.remove("hide")
    const json = JSON.stringify(d);
    let t = getCookie("USER_TOKEN")
    const res = await axios.post(config.backend + `note/all/search`, json, {
      headers: {
        'Content-Type': 'application/json',
        'Token': t
      }
    });
    if (res.data.status) {
      setState(res.data.data)
    }
    loadCircle.classList.add("hide")
  }

  useEffect(() => {
    setTimeout(() => {
      setLoginState(loginStateSele)
      setRegisterState(registerStateSele)
    }, 1);
    dispatch(clearLogInState())
    dispatch(clearRegisterState())
    setTimeout(() => {
      setLoginState(false)
      setRegisterState(false)
    }, 7001)
    document.getElementById("tab").innerHTML = ""
    if (q) {
      searchNote();
    } else {
      getNotes();
    }
  }, [])

  return (
    <>
      <Alert show={loginState} event={() => setLoginState(false)} massage={"Login Successful"} color={"green"} />
      <Alert show={registerState} event={() => setRegisterState(false)} massage={"Register Successful"} color={"green"} />
      <div className='load-circle hide' id='load_circle'>
        <div></div>
      </div>
      <div className='con'>
        <div className="space-3"></div>
        <form onSubmit={searchNote}>
          <div className="input-group">
            <input placeholder="Search..." name="query" id="s_field"></input>
          </div>
        </form>
        <div className="space-3"></div>

        <div className="post-sess">
          {(() => {
            if (!searchState) {
              return (
                <Link to={"/note/new"} className="note-link new-post-link">
                  <i class="bi bi-plus-lg new-post-link-add"></i>
                  <p>Create New Note</p>
                </Link>
              )
            } else {
              return (
                <div className="note-link new-post-link-x">
                  <p>Searching result for "{qState}".</p>
                  <p>{getState.length} result found.</p>
                </div>
              )
            }
          })()}
          {(() => {
            let p = []
            getState.map((e) => {
              var myHTML = e.html;
              var strippedHtml = myHTML.replace(/<[^>]+>/g, '');
              if (strippedHtml.length > 150) {
                strippedHtml = strippedHtml.substring(0, 150) + "..."
              }
              var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              var today = new Date(e.date);

              p.push(
                <Link to={"/note/read/" + e._id} className="note-link">
                  <h2 className="note-link-title">
                    {e.title + " "}
                  </h2>
                  <p className="text-small-l t-gray">
                    {today.toLocaleDateString("en-US", options) + " "}
                    {(() => {
                      if (e.visible === false) {
                        return (
                          <i class="bi bi-eye color-gary"></i>
                        )
                      }
                    })()}
                  </p>
                  <p>
                    {strippedHtml}
                  </p>
                  <div className="tags-y">
                    {(() => {
                      let t = []
                      e.tags.map((e) => {
                        t.push(
                          <div className="tags-x">
                            {e}
                          </div>
                        )
                      })
                      return t;
                    })()}
                  </div>
                </Link>
              )
            })
            return p;
          })()}
        </div>

      </div>
    </>
  )
}

export default NoteHome
