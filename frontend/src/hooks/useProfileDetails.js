import { useEffect, useState } from 'react'
import UserService from '../services/user.service'

export default function useProfileDetails(user_id) {
  const [userData, setUserData] = useState({})
  const [userPicData, setUserPicData] = useState({})
  const [isLoading, setisLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    UserService.getUserProfile(user_id).then((response) => {
      if (response.status === 200) {
        setisLoading(false)
        setUserData(response.data)
        setUserPicData({
          id: response.data.id,
          profile_picture: `${response.data.profile_picture}`,
        })
      } else {
        setisLoading(false)
        setError(response.data)
        console.error('Error: ', response)
      }
    })
  }, [user_id])

  return { isLoading, userData, userPicData, error }
}
