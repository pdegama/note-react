import { configureStore } from '@reduxjs/toolkit'
import newNote from './reducers/newnote'
import editNote from './reducers/editnote'

export default configureStore({
  reducer: {
    newnote: newNote,
    editnote: editNote
  }
})