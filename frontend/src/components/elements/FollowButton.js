import { useAsyncFn } from 'react-use'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import Swal from 'sweetalert2'

import UserService from '../../services/user.service'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'black',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 900,
  timerProgressBar: true,
})

const FollowButton = (props) => {
  const { follower, following } = props
  const [action, setAction] = useState(props.action)
  const navigate = useNavigate()
  //eslint-disable-next-line
  const [state, followToggle] = useAsyncFn(async () => {
    if (action === 'Follow') {
      const response = await UserService.postUserFollowing(follower, following)

      if (response.status === 201) {
        Toast.fire({
          icon: 'success',
          title: 'Followed!',
        }).then(() => {
          setAction('Unfollow')
          navigate(0)
        })
      }
      if (response.status === 400) {
        Toast.fire({
          icon: 'error',
          title: 'Already followed!',
          timer: 2000,
        })
      }

      if (response.status === 401) {
        Toast.fire({
          icon: 'error',
          title: 'Unauthorized!',
          timer: 2000,
        })
      }

      if (response.status === 500) {
        Toast.fire({
          icon: 'error',
          title: 'Server Error! Please refresh the site',
          customClass: {
            popup: 'colored-toast',
          },
          timer: 2000,
        }).then(() => {
          navigate(0)
        })
      }

      return response
    } else {
      const response = await UserService.deleteUserFollowing(
        follower,
        following,
      )
      if (response.status === 204) {
        Toast.fire({
          icon: 'success',
          title: 'Unfollowed!',
        }).then(() => {
          setAction('Follow')
          navigate(0)
        })
      }

      if (response.status === 500) {
        Toast.fire({
          icon: 'error',
          title: 'Server Error! Please refresh the site',
        }).then(() => {
          navigate(0)
        })
      }

      return response
    }
  }, [props])

  return (
    <button
      className="btn me-4 w-100 d-flex align-items-center justify-content-center btn-outline-dark"
      onClick={() => followToggle()}
    >
      <span> {props.action} </span>
    </button>
  )
}

export default FollowButton
