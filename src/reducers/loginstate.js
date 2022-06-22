import { createSlice } from '@reduxjs/toolkit'

export const logInState = createSlice({
  name: 'loginstate',
  initialState: {
    value: false
  },
  reducers: {
    clearLogInState: state => {
      state.value = false
    },
    setLogInState: state => {
      state.value = true
    }
  }
})

export const { clearLogInState, setLogInState } = logInState.actions

export default logInState.reducer