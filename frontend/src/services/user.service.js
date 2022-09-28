import { axiosClient } from "./client/base";

const getCategories = () => {
  return axiosClient.get("api/v1/category/");
};

const getUserProfiles = () => {
  return axiosClient.get("api/v1/profile/");
};

const getUserProfile = (id) => {
  return axiosClient.get(`api/profile/${id}/`);
};

const getProfilePicture = (id) => {
  return axiosClient.get(`api/profile/${id}/picture/`);
};
//eslint-disable-next-line
export default {
  getCategories,
  getUserProfile,
  getUserProfiles,
  getProfilePicture,
};
