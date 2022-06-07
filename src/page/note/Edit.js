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
import { useParams } from 'react-router-dom';

const Edit = () => {

  let { id } = useParams()
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const getData = async () => {
    let mainCon = document.getElementById("main_con")
    let secCon = document.getElementById("sec_con")
    let titleEle = document.getElementById("title")
    let tagsEle = document.getElementById("tags")
    let visibleEle = document.getElementById("visible")
    let loadCircle = document.getElementById("load_circle")

    const json = JSON.stringify({});
    let t = getCookie("USER_TOKEN")
    const res = await axios.post(config.backend + `note/read/${id}`, json, {
      headers: {
        'Content-Type': 'application/json',
        'Token': t
      }
    });

    if (res.data.status) {
      if (res.data.edit) {
        mainCon.classList.remove("hide")
        const blocksFromHTML = htmlToDraft(res.data.html)
        const content = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(() => EditorState.createWithContent(content))
        titleEle.setAttribute("value", res.data.title)
        let tags = ""
        for (const k in res.data.tags) {
          tags += ((k === "0" || k === 0) ? "" : ", ") + res.data.tags[k]
        }
        tagsEle.setAttribute("value", tags)

        console.log(visibleEle.childNodes);

        if (!res.data.visible) {
          visibleEle.childNodes[1].setAttribute("selected", "")
        }

      } else {
        secCon.classList.remove("hide")
      }
    } else {
      secCon.classList.remove("hide")
    }

    loadCircle.classList.add("hide")

  }

  useEffect(() => {
    getData()
  }, [])

  const getHtml = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    return markup
  }

  const updateNote = (e) => {
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
      const res = await axios.post(config.backend + `note/edit/${id}`, json, {
        headers: {
          'Content-Type': 'application/json',
          'Token': t
        }
      });

      if (res.data.status) {
        window.location = "/note/read/" + id
      } else if (!res.data.status) {
        formErr.innerHTML = "Server Error.";
        formBtn.removeAttribute("disabled")
        formErr.classList.remove("hide")
      };

    }, 1000)

  }

  return (
    <>
      <div className='load-circle' id='load_circle'>
        <div></div>
      </div>
      <div className='con hide' id="main_con">
        <h1 className='sub-title'>Edit</h1>
        <form onSubmit={updateNote}>
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
            <select name="visible" id="visible">
              <option value="true">Private</option>
              <option value="false">Public</option>
            </select>
          </div>
          <button type='submit' id='form_submin_button' className='btn btn-primary'>
            Update
          </button>
        </form>
      </div>
      <div className='con hide' id="sec_con">
        <h1 className='sub-title'>Page Not Found!</h1>
      </div>
    </>
  )

}

export default Edit
