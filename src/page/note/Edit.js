import React, { useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { GetField } from "../../tools/getform"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { getCookie, deleteCookie } from "../../tools/cookie"
import config from '../../config'

const Edit = () => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  /* useEffect(() => {

    setTimeout(() => {
      const blocksFromHTML = htmlToDraft(``)

      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      setEditorState(() => EditorState.createWithContent(content))

    }, 3000)
  }, []) */

  const getHtml = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    return markup
  }

  const newNote = (e) => {
    e.preventDefault()
    let v = [];
    let error = ``
    let d = GetField(e)
    d.html = getHtml()
    if (d.tags === "") {
      d.tags = " "
    }
    let formErr = document.getElementById("form_error")
    let formSuc = document.getElementById("form_succe")
    let formBtn = document.getElementById("form_submin_button")
    formErr.classList.add("hide")
    formSuc.classList.add("hide")
    formBtn.setAttribute("disabled", "")

    if (d.title.length >= 1) {
      v.push(1)
    } else {
      error += `
      Please enter title.<br />
      `
    }

    setTimeout(async () => {
      if (v.length !== 1) {
        formErr.innerHTML = error;
        formBtn.removeAttribute("disabled")
        formErr.classList.remove("hide")
        return
      }

      const json = JSON.stringify(d);
      let t = getCookie("USER_TOKEN")
      const res = await axios.post(config.backend + 'note/new', json, {
        headers: {
          'Content-Type': 'application/json',
          'Token': t
        }
      });

      if (res.data.status) {
        window.location = "/note/read/" + res.data.id
      } else if (!res.data.status) {
        formErr.innerHTML = "Server Error.";
        formBtn.removeAttribute("disabled")
        formErr.classList.remove("hide")
      };

    }, 1000)

  }

  return (
    <>
      <div className='con'>
        <h1 className='sub-title'>Edit</h1>
        <form onSubmit={newNote}>
          <div id="form_error" className="alert alert-red hide  "></div>
          <div id="form_succe" className="alert alert-green hide">

          </div>
          <div className="input-group my-15">
            <input type="text" id="title" placeholder="Title" name="title" />
          </div>
          <Editor
            defaultEditorState={editorState}
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="editor-wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="editor-toolbar-class"
          />
          <div className="input-group my-15">
            <label >Tags (separate with ,):</label>
            <input type="text" id="tags" placeholder="Tags" name="tags" />
          </div>
          <div className="input-group my-15">
            <label >Visibility:</label>
            <select name="visible" >
              <option value="true">Private</option>
              <option value="false">Public</option>
            </select>
          </div>
          <button type='submit' id='form_submin_button' className='btn btn-primary'>
            Update
          </button>
        </form>
      </div>
    </>
  )

}

export default Edit
