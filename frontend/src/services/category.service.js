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

const getCategoriesByPage = (page) => {
  return axiosClient.get(`api/v1/category/?page=${page}`)
}

const addLesson = async (category) => {
  return await axiosClient.post('api/v1/category/', category)
}

const addWord = async (word) => {
  return await axiosClient.post('api/v1/word/', word)
}

const updateCategory = async (id, category_name, category_description) => {
  return await axiosClient.put(`api/v1/category/${id}/`, {
    category_name,
    category_description,
  })
}

const deleteCategory = async (id) => {
  return await axiosClient.delete(`api/v1/category/${id}/`)
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

const getWordsLearned = async (user_profile_taker_id) => {
  return await axiosClient.get(
    `api/v1/words_learned/?user_profile_taker_id=${user_profile_taker_id}&is_correct=true`,
  )
}

const getAllActivities = async (id) => {
  return await axiosClient.get(`/api/v1/activities/${id}`)
}

//eslint-disable-next-line
export default {
  getCategories,
  getCategoriesByPage,
  getLesson,
  getWordsLearned,
  getLessonResult,
  getLessonResults,
  getLessonExists,
  addLesson,
  addWord,
  updateCategory,
  deleteCategory,
  submitLessonAnswer,
  getAllActivities,
}
