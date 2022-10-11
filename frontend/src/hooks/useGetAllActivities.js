import { useEffect, useState } from 'react'
import categoryService from '../services/category.service'

export default function useGetAllActivities(id, own) {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (id !== undefined) {
      categoryService
        .getAllActivities(id, own)
        .then((response) => {
          if (response.status === 200) {
            setActivities(response.data)
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
  }, [id, own])

  return { isLoading, activities, error }
}
