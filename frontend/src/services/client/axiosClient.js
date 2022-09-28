import axios from "axios";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-CSRFToken",
  withCredentials: true,
};

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
  config,
});

axiosClient.defaults.withCredentials = true;
axiosClient.defaults.xsrfHeaderName = "X-CSRFToken";
axiosClient.defaults.xsrfCookieName = "XSRF-TOKEN";

//using interceptors, add the token to the header of every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


export { axiosClient };
