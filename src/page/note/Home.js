import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCookie } from "../../tools/cookie"
import config from '../../config'
import axios from "axios"

const NoteHome = () => {

  let [getState, setState] = useState([]);

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

  useEffect(() => {
    getNotes();
  }, [])

  return (
    <>
      <div className='con'>
        <div className="space-3"></div>
        <div className="input-group">
          <input placeholder="Search..."></input>
        </div>
        <div className="space-3"></div>

        <div className="post-sess">
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

              p.push(<Link to={"/note/read/" + e._id} className="note-link">
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
              </Link>)
            })
            return p;
          })()}
        </div>

      </div>
    </>
  )
}

export default NoteHome
