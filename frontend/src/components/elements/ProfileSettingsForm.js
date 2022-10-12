import userService from '../../services/user.service'
import * as yup from 'yup'
import { ReactComponent as ClipIcon } from '../../assets/ClipIcon.svg'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'

export default function ProfileSettingsForm(props) {
  const [blob, setBlob] = useState(null)
  const { userData, userPicData } = props

  const schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    bio: yup.string().required(),
    profile_picture: yup.mixed().required(),
  })

  const resolver = async (data, context, options) => {
    return yupResolver(schema)(data, context, options)
  }

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: userData['user'].first_name,
      last_name: userData['user'].last_name,
      bio: userData['bio'],
    },
    resolver: resolver,
  })

  const onSubmit = (data) => {
    const updateData = {
      bio: data.bio,
      user: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
      is_profile_updated: true,
    }

    if (data.profile_picture.length > 0) {
      const formData = new FormData()
      formData.append('profile_picture', data.profile_picture[0])

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      setBlob(URL.createObjectURL(data.profile_picture[0]))

      Swal.fire({
        title: 'Are you sure?',
        text: 'Would you like to update your profile and your picture?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'No, my changes are not yet final.',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Saved!', 'Your changes have been saved.', 'success')
          userService.updateUserProfile(userData['id'], updateData)
          userService.uploadProfilePicture(userData['id'], formData, config)
        } else {
          Swal.fire(
            'Changes are not saved',
            'Your picture is reverted back to previous one.',
            'info',
          )
          setBlob(null)
          reset()
        }
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Would you like to update your profile?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'No, my changes are not yet final.',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Saved!', 'Your changes have been saved.', 'success')
          userService.updateUserProfile(userData['id'], updateData)
        } else {
          Swal.fire(
            'Changes are not saved',
            'Your picture is reverted back to previous one.',
            'info',
          )
          setBlob(null)
          reset()
        }
      })
    }
  }

  const hiddenFileInput = useRef(null)
  const { ref, ...rest } = register('profile_picture')

  const handleUploadClick = () => {
    hiddenFileInput.current.click()
  }

  return (
    <>
      <div className="text-center">
        <img
          className="img-fluid rounded-2"
          style={{ width: 128, height: 128 }}
          src={blob ? blob : userPicData.profile_picture}
          alt=""
        />
        <br />
        <span className="small">Profile Picture Preview</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="small">First Name</span>
        <input
          {...register('first_name')}
          className="form-control mb-6 border-top-0 border-start-0 border-end-0"
          type="text"
          placeholder="Name"
        />
        <span className="small">Last Name</span>

        <input
          {...register('last_name')}
          className="form-control mb-6 border-top-0 border-start-0 border-end-0"
          type="text"
          placeholder="Surname"
        />
        <span className="small">Bio</span>

        <textarea
          {...register('bio')}
          className="form-control mb-6 border-top-0 border-start-0 border-end-0"
          style={{ resize: 'none' }}
          cols={30}
          rows={3}
          placeholder="Bio"
        />
        <span className="small">Profile Picture</span>

        <div
          onClick={handleUploadClick}
          className="btn mb-6 d-flex align-items-center"
        >
          <ClipIcon className="me-3" />
          <span className="fw-normal">Upload Profile Picture</span>
        </div>
        <input
          type="file"
          className="d-none"
          {...rest}
          ref={(e) => {
            ref(e)
            hiddenFileInput.current = e
          }}
        />

        <button className="btn w-100 btn-outline-dark">Submit</button>
      </form>
    </>
  )
}
