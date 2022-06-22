import { createSlice } from '@reduxjs/toolkit'

export const registerReducers = createSlice({
  name: 'registerstate',
  initialState: {
    value: false
  },
  reducers: {
    clearRegisterState: state => {
      state.value = false
    },
    setRegisterState: state => {
      state.value = true
    }
  }
})

export const { clearRegisterState, setRegisterState } = registerReducers.actions

export default registerReducers.reducer