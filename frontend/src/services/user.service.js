import { axiosClient } from './client/axiosClient'

const getUserProfiles = (page) => {
  return axiosClient.get(`profile/?page_size=9&page=${page}`)
}

const getUserProfile = async (id) => {
  try {
    const profile_get = await axiosClient.get(`profile/${id}/`)

    return profile_get
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
}
