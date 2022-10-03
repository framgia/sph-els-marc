import { useEffect, useState } from 'react'
import CategoryService from '../services/category.service'

export default function useLessonResults(
  category_taken_id,
  user_profile_taker_id,
) {
  const [resultData, setResultData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({})

  useEffect(() => {
    if (
      category_taken_id !== undefined ||
      user_profile_taker_id !== undefined
    ) {
      CategoryService.getLessonResult(category_taken_id, user_profile_taker_id)
        .then((response) => {
          if (response.status === 200) {
            setResultData(response.data['results'][0])
            setIsLoading(false)
          } else {
            setError(response)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    }
  }, [user_profile_taker_id, category_taken_id])

  return { isLoading, resultData, error }
}
