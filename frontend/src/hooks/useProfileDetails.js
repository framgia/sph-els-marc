import { useEffect, useState } from 'react'
import UserService from '../services/user.service'

export default function useProfileDetails(user_id) {
  const [userData, setUserData] = useState({})
  const [userPicData, setUserPicData] = useState({})
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    UserService.getUserProfile(user_id).then((response) => {
      if (response.status === 200) {
        setisLoading(false)
        setUserData(response.data)
        setUserPicData({
          id: response.data.id,
          profile_picture: `${process.env.REACT_APP_MEDIA_URL}${response.data.profile_picture}`,
        })
      } else {
        console.error('Error: ', response)
      }
    })
  }, [user_id])

  return { isLoading, userData, userPicData }
}
