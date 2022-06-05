import React, { useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const New = () => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  useEffect(() => {

    setTimeout(() => {
      const blocksFromHTML = htmlToDraft(``)

      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      setEditorState(() => EditorState.createWithContent(content))

    }, 3000)
  }, [])

  const getHtml = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    console.log(markup);
  }

  return (
    <>
      <div className='con'>
        <h1 className='sub-title'>New</h1>
        <Editor
          defaultEditorState={editorState}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="editor-wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="editor-toolbar-class"
        />
      </div>
      <button onClick={getHtml} className='btn btn-primary'>
        Get Html
      </button>
    </>
  )

}

export default New
