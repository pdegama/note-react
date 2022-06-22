import { configureStore } from '@reduxjs/toolkit'
import newnote from './reducers/newnote'
import editnote from './reducers/editnote'
import logoutstate from './reducers/logoutstate'
import loginstate from './reducers/loginstate'
import registerstate from './reducers/registerstate'

export default configureStore({
  reducer: {
    newnote,
    editnote,
    logoutstate,
    loginstate,
    registerstate
  }
})