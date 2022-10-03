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

const getCategories = () => {
  return axiosClient.get('api/v1/category/')
}

const getLesson = async (category_id) => {
  return await axiosClient.get(`api/v1/category/${category_id}/`)
}

const submitLessonAnswer = async (taker_id, lessonAnswering) => {
  const data = {
    category_id: lessonAnswering['category_id'],
    questions: lessonAnswering['questions'],
  }

  const lesson_data = await axiosClient.post(
    `api/v1/lesson_answering/${taker_id}/`,
    data,
  )
  return lesson_data
}

//eslint-disable-next-line
export default {
  getCategories,
  getLesson,
  getLessonResult,
  getLessonResults,
  getLessonExists,
  submitLessonAnswer,
}
