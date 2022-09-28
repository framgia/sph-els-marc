import { axiosClient } from "./client/axiosClient";

const getCategories = () => {
  return axiosClient.get("api/v1/category/");
};

const getUserProfiles = () => {
  return axiosClient.get("api/v1/profile/");
};

const getUserProfile = async (id) => {
  try {
    const profile_get = await axiosClient.get(`api/v1/profile/${id}/`);
    const profile_picture_get = await axiosClient.get(
      `api/v1/profile_picture/${id}/`
    );
    return [profile_get, profile_picture_get];
  } catch (err) {
    return err.response;
  }
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