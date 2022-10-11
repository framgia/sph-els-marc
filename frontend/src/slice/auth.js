import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  loading: false,
  user: null,
  error: null,
  success: false,
  isLoggedIn: false,
  message: '',
}

user && (initialState.isLoggedIn = true)
user && (initialState.user = user)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true
      state.message = ''
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.isLoggedIn = true
      state.user = action.payload
    },
    logoutRequest: (state) => {
      state.loading = true
      state.message = ''
    },
    registerFail: (state, action) => {
      state.loading = false
      state.success = false
      state.isLoggedIn = false
      state.message = action.payload
      state.error = action.payload
    },
    loginRequest: (state) => {
      state.loading = true
      state.message = ''
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.isLoggedIn = true
      state.user = action.payload
    },
    loginFail: (state, action) => {
      state.loading = false
      state.success = false
      state.isLoggedIn = false
      state.message = action.payload
      state.error = action.payload
    },
    logout: (state) => {
      state.loading = false
      state.error = null
      state.isLoggedIn = false
      state.user = null
    },
  },
})

export const {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
  logoutRequest,
  logout,
} = authSlice.actions

export default authSlice.reducer
