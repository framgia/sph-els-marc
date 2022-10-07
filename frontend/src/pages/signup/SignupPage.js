import NavBarLanding from '../../components/elements/NavBarLanding'
import NavBarSideLanding from '../../components/elements/NavBarSideLanding'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import authService from '../../services/auth.service'
import {
  registerRequest,
  registerFail,
  registerSuccess,
} from '../../slice/auth'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const SignupPage = () => {
  const { isLoggedIn, message, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password1: '',
      password2: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required'),
      email: Yup.string()
        .email('Email must be valid email address')
        .required('Email is required'),
      password1: Yup.string().required('Password is required'),
      password2: Yup.string().required('Confirm Password is required'),
    }),
    onSubmit: (values) => {
      const { username, email, password1, password2 } = values

      dispatch(registerRequest())
      if (password1 !== password2) {
        dispatch(registerFail('Passwords do not match'))
      } else {
        authService
          .register(username, email, password1, password2)
          .then(() => {
            dispatch(registerSuccess())
            Swal.fire(
              'Registration Success! You may now login!',
              '',
              'success',
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/login'
              }
            })
          })
          .catch((error) => {
            console.error(error)
            dispatch(registerFail(error.response.data))
          })
      }
    },
  })

  if (isLoggedIn) {
    window.location.href = '/'
  }

  return (
    <>
      <NavBarLanding />
      <NavBarSideLanding />
      <section
        id="login"
        className="py-24 py-lg-36 bg-white"
        style={{
          backgroundImage: 'url("/images/forms/form-1-shadow.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <div className="container">
          <div className="text-center mw-sm px-3 mx-auto">
            <img className="img-fluid" src="images/neuword-logo.svg" alt="" />
            <h2 className="mb-2 lh-sm mt-6 font-heading">
              Sign up to your account
            </h2>
            <p className="mb-6 lh-lg">Please enter your details to proceed.</p>
          </div>
          <form
            className="text-start mx-auto"
            style={{ width: 300 }}
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username && (
                <div className="invalid-feedback d-block">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <div className="invalid-feedback d-block">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                id="password1"
                name="password1"
                onChange={formik.handleChange}
                value={formik.values.password1}
              />
              {formik.errors.password1 && (
                <div className="invalid-feedback d-block">
                  {formik.errors.password1}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="form-control"
                type="password"
                id="password2"
                name="password2"
                onChange={formik.handleChange}
                value={formik.values.password2}
              />
              {formik.errors.password2 && (
                <div className="invalid-feedback d-block">
                  {formik.errors.password2}
                </div>
              )}
            </div>
            <div className="mb-3">
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              {error && error['username'] && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {error['username'][0]}
                  </div>
                </div>
              )}
              {error && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </div>
              )}
              <button className="btn btn-primary w-100" type="submit">
                Sign up
              </button>
            </div>
            <div className="text-center">
              <p className="mb-0">
                Already have an account?
                <Link className="text-decoration-none" to="/login">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SignupPage
