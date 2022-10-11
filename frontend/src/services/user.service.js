import { axiosClient } from './client/axiosClient'

const getUserProfiles = () => {
  return axiosClient.get('profile/')
}

const getUserProfile = async (id) => {
  try {
    const profile_get = await axiosClient.get(`profile/${id}/`)

    return profile_get
  } catch (err) {
    return err.response
  }
}

const updateUserProfile = async (id, data) => {
  try {
    const profile_update = await axiosClient.put(`profile/${id}/`, data)
    return profile_update
  } catch (err) {
    return err.response
  }
}

const postUserFollowing = async (postfollower, postfollowing) => {
  try {
    const profile_post = await axiosClient.post(`following/`, {
      follower: postfollower,
      following: postfollowing,
    })

    return profile_post
  } catch (err) {
    return err.response
  }
}

const uploadProfilePicture = async (id, data, config) => {
  try {
    const profile_picture = await axiosClient.post(
      `profile_picture/upload/${id}/`,
      data,
      config,
    )

    return profile_picture
  } catch (err) {
    return err.response
  }
}

const deleteUserFollowing = async (fwr, fwing) => {
  try {
    const profile_post = await axiosClient.delete(`following/delete/`, {
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
  getUserProfiles,
  getUserProfile,
  postUserFollowing,
  deleteUserFollowing,
  updateUserProfile,
  uploadProfilePicture,
}
