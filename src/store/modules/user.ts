import { createSlice } from "@reduxjs/toolkit";
import {  setToken as _setToken,getToken, removeToken } from "@/utils/token.ts";

const userStore = createSlice({
  name: 'user',
  initialState: {
    token:getToken() || '',
    userInfo: {}
  },

   reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

const { setToken,setUserInfo,clearUserInfo } = userStore.actions



export  { setToken,setUserInfo,clearUserInfo } 

const userReducer = userStore.reducer

export default userReducer