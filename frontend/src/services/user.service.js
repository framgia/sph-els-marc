import { axiosClient } from './client/axiosClient'

const getCategories = () => {
  return axiosClient.get('api/v1/category/')
}

const getUserProfiles = () => {
  return axiosClient.get('api/v1/profile/')
}

const getUserProfile = async (id) => {
  try {
    const profile_get = await axiosClient.get(`api/v1/profile/${id}/`)

    return profile_get
  } catch (err) {
    return err.response
  }
}

const getProfilePicture = (id) => {
  return axiosClient.get(`api/profile/${id}/picture/`)
}

const postUserFollowing = async (postfollower, postfollowing) => {
  try {
    const profile_post = await axiosClient.post(`api/v1/following/`, {
      follower: postfollower,
      following: postfollowing,
    })

    return profile_post
  } catch (err) {
    return err.response
  }
}

const deleteUserFollowing = async (fwr, fwing) => {
  try {
    const profile_post = await axiosClient.delete(`api/v1/following/delete/`, {
      data: {
        follower: fwr,
        following: fwing,
      },
    })
    return profile_post
  } catch (err) {
    return err.response
  }
}

//eslint-disable-next-line
export default {
  getCategories,
  getProfilePicture,
  getUserProfiles,
  getUserProfile,
  postUserFollowing,
  deleteUserFollowing,
}
