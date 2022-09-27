import { axiosClient } from "./axiosClient";

const getCSRFToken = async () => {
  const response = await axiosClient.get("api/v1/csrf/");
  return response.headers["x-csrftoken"];
};

const submitLogin = async (csrf, user, pass) => {
  const response = await axiosClient.post(
    "dj-rest-auth/login/",
    {
      username: user,
      password: pass,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
    }
  );
  return response;
};

const submitRegister = async (csrf, user, pass1, pass2, email) => {
  const response = await axiosClient.post(
    "dj-rest-auth/registration/",
    {
      username: user,
      password1: pass1,
      password2: pass2,
      email: email,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
    }
  );
  return response;
};

const getLoggedInInfo = async (token) => {
  const response = await axiosClient.get(
    "dj-rest-auth/user/",
    {},
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
        WithCredentials: true,
      },
    }
  );
  return response;
};

const submitLogout = async (csrf) => {
  const response = await axiosClient.post(
    "dj-rest-auth/logout/",
    {},
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
    }
  );
  return response;
};

export {
  getCSRFToken,
  submitLogin,
  submitRegister,
  submitLogout,
  getLoggedInInfo,
};
