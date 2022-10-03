import { useEffect, useState } from 'react'
import categoryService from '../services/category.service'

export default function useGetLesson(category_id) {
  const [lesson, setLesson] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({})

  useEffect(() => {
    if (category_id !== undefined) {
      categoryService
        .getLesson(category_id)
        .then((response) => {
          if (response.status === 200) {
            setLesson(response.data)
            setIsLoading(false)
            setError(false)
          }
        })
        .catch((error) => {
          console.log(error)
          setError(error)
          setIsLoading(false)
        })
    }
  }, [category_id])

  return { isLoading, lesson, error }
}
