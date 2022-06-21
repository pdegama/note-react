import { createSlice } from '@reduxjs/toolkit'

export const newNoteReducers = createSlice({
  name: 'newnote',
  initialState: {
    value: false
  },
  reducers: {
    clearNewNote: state => {
      state.value = false
    },
    setNewNote: state => {
      state.value = true
    }
  }
})

export const { clearNewNote, setNewNote } = newNoteReducers.actions

export default newNoteReducers.reducer