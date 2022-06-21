import { createSlice } from '@reduxjs/toolkit'

export const editNoteReducers = createSlice({
  name: 'editnote',
  initialState: {
    value: false
  },
  reducers: {
    clearEditNote: state => {
      state.value = false
    },
    setEditNote: state => {
      state.value = true
    }
  }
})

export const { clearEditNote, setEditNote } = editNoteReducers.actions

export default editNoteReducers.reducer