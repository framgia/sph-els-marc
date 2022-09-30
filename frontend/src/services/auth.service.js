import {
  submitLogin,
  submitRegister,
  submitLogout,
  getLoggedInInfo,
} from './client/base'

const register = async (username, email, password1, password2) => {
  return submitRegister(username, email, password1, password2)
}

const login = (username, password) => {
  return submitLogin(username, password)
}

const logout = async () => {
  return submitLogout()
}

const getLoggedInUser = async () => {
  return getLoggedInInfo()
}
// eslint-disable-next-line
export default { register, login, logout, getLoggedInUser }
