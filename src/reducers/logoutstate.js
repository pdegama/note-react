import { createSlice } from '@reduxjs/toolkit'

export const logOutReducers = createSlice({
  name: 'logoutstate',
  initialState: {
    value: false
  },
  reducers: {
    clearLogOutState: state => {
      state.value = false
    },
    setLogOutState: state => {
      state.value = true
    }
  }
})

export const { clearLogOutState, setLogOutState } = logOutReducers.actions

export default logOutReducers.reducer