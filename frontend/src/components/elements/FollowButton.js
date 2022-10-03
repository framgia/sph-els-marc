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
      className="btn me-4 w-100 d-flex align-items-center justify-content-center btn-outline-primary"
      onClick={() => followToggle()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        className="me-2"
      >
        <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
      </svg>
      <span> {props.action} </span>
    </button>
  )
}

export default FollowButton
