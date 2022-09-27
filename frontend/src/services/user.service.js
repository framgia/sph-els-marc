import { authHeader } from "./auth-header";
import { axiosClient } from "./client/base";

const getCategories = () => {
  return axiosClient.get("api/v1/category/", { headers: authHeader() });
};

const getUserProfiles = () => {
  return axiosClient.get("api/v1/profile/", { headers: authHeader() });
};

const getUserProfile = (id) => {
  return axiosClient.get(`api/profile/${id}/`);
};

const getProfilePicture = (id) => {
  return axiosClient.get(`api/profile/${id}/picture/`, {
    headers: authHeader(),
  });
};
