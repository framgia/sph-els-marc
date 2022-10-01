import { useEffect, useState } from 'react'
import categoryService from '../services/category.service'

export default function useLessonExists(
  category_taken_id,
  user_profile_taker_id,
) {
  const [exists, setExists] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({})

  useEffect(() => {
    if (
      category_taken_id !== undefined ||
      user_profile_taker_id !== undefined
    ) {
      categoryService
        .getLessonExists(category_taken_id, user_profile_taker_id)
        .then((response) => {
          if (response.status === 200) {
            setExists(response.data['exists'])
            setIsLoading(false)
          } else {
            setExists(false)
          }
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    }
  }, [user_profile_taker_id, category_taken_id])

  return { isLoading, exists, error }
}
