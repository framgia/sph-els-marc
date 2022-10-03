import { axiosClient } from './client/axiosClient'

const getLessonResults = async () => {
  return await axiosClient.get('api/v1/lesson_results/')
}

const getLessonResult = async (category_taken_id, user_profile_taker_id) => {
  const lesson_data = await axiosClient.get(
    `api/v1/lesson_results/?user_profile_taker_id=${user_profile_taker_id}&category_taken_id=${category_taken_id}`,
  )

  return lesson_data
}

const getLessonExists = async (category_taken_id, user_profile_taker_id) => {
  const exists_data = await axiosClient.get(
    `api/v1/lesson_results/${category_taken_id}/${user_profile_taker_id}/`,
  )
  return exists_data
}

//eslint-disable-next-line
export default {
  getLessonResult,
  getLessonResults,
  getLessonExists,
}
