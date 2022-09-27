import {
  getCSRFToken,
  submitLogin,
  submitRegister,
  submitLogout,
  getLoggedInInfo,
} from "./client/base";

const register = async (username, email, password1, password2) => {
  const csrf = await getCSRFToken();
  return submitRegister(csrf, username, email, password1, password2);
};

const login = async (username, password) => {
  const csrf = await getCSRFToken();
  const resp = await submitLogin(csrf, username, password);
  if (resp.status === 200) {
    const token = resp.data["key"];
    const { data } = await getLoggedInInfo(token);
    data["accessToken"] = token;
    //console.table(data);
    localStorage.setItem("user", JSON.stringify(data));
  }
};

const logout = async () => {
  const csrf = await getCSRFToken();
  return submitLogout(csrf);
};

const getLoggedInUser = async (token) => {
  return getLoggedInInfo(token);
};
// eslint-disable-next-line
export default { register, login, logout, getLoggedInUser };
