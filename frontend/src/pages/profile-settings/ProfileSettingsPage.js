import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ReactComponent as ClipIcon } from './ClipIcon.svg'
import useProfileDetails from '../../hooks/useProfileDetails'
import { useParams } from 'react-router-dom'
import userService from '../../services/user.service'
import NavBarLanding from '../../components/elements/NavBarLanding'
import Footer from '../../components/Footer'
import Swal from 'sweetalert2'

export default function ProfileSettingsPage() {
  const { id } = useParams()
  const { isLoading, userData, userPicData } = useProfileDetails(id)
  return (
    <>
      <NavBarLanding />
      <ProfileSettingsSection>
        {!isLoading && (
          <ProfileSettingsForm userData={userData} userPicData={userPicData} />
        )}
      </ProfileSettingsSection>

      <Footer />
    </>
  )
}

function ProfileSettingsForm(props) {
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

function ProfileSettingsSection(props) {
  return (
    <section className="position-relative py-8 bg-white overflow-hidden">
      <img
        className="d-none d-lg-block position-absolute top-0 end-0 col-6"
        src="/images/forms/shadows-big.png"
        alt="form background"
      />
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 mb-12 mb-lg-0">
            <div className="mw-md mx-auto">
              <h2 className="mb-12 display-4 font-heading">Edit Profile</h2>
              {props.children}
            </div>
          </div>
          <div className="position-relative col-12 col-lg-6 pt-12 pt-lg-0">
            <img
              className="position-absolute top-0 start-0 bottom-0 h-100 w-100"
              src="/images/forms/shadows-big.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}
