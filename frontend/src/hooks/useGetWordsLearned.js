import { useEffect, useState } from 'react'
import CategoryService from '../services/category.service'

export default function useGetWordsLearned(user_profile_taker_id) {
  const [words, setWords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({})

  useEffect(() => {
    CategoryService.getWordsLearned(user_profile_taker_id)
      .then((response) => {
        if (response.status === 200) {
          setWords(response.data.results)
          setIsLoading(false)
          setError(false)
        }
      })
      .catch((error) => {
        console.error(error)
        setError(error)
        setIsLoading(false)
      })
  }, [user_profile_taker_id])

  return { isLoading, words, error }
}
