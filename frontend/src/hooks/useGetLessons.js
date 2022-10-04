import { useEffect, useState } from 'react'
import categoryService from '../services/category.service'
import { useSearchParams } from 'react-router-dom'

export default function useGetLessons() {
  const [lessons, setLessons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({})
  const [searchParams] = useSearchParams()

  useEffect(() => {
    let category_name = searchParams.get('category_name')
    if (category_name !== null) {
      categoryService
        .getCategories({ category_name })
        .then((response) => {
          if (response.status === 200) {
            setLessons(response.data)
            setIsLoading(false)
            setError(false)
          }
        })
        .catch((error) => {
          console.error(error)
          setError(error)
          setIsLoading(false)
        })
    } else {
      category_name = ''
      categoryService
        .getCategories({ category_name })
        .then((response) => {
          if (response.status === 200) {
            setLessons(response.data)
            setIsLoading(false)
            setError(false)
          }
        })
        .catch((error) => {
          console.error(error)
          setError(error)
          setIsLoading(false)
        })
    }
  }, [searchParams])

  return {
    isLoading,
    lessons,
    error,
  }
}
