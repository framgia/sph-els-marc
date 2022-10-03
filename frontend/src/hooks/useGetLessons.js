import { useEffect, useState } from 'react'
import categoryService from '../services/category.service'

export default function useGetLessons() {
  const [lessons, setLessons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({})

  useEffect(() => {
    categoryService
      .getCategories()
      .then((response) => {
        if (response.status === 200) {
          setLessons(response.data)
          setIsLoading(false)
          setError(false)
        }
      })
      .catch((error) => {
        console.log(error)
        setError(error)
        setIsLoading(false)
      })
  }, [])

  return { isLoading, lessons, error }
}
