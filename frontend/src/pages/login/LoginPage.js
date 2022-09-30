import NavBarLanding from '../../components/elements/NavBarLanding'
import NavBarSideLanding from '../../components/elements/NavBarSideLanding'
import Footer from '../../components/Footer'
import { Link, Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { login } from '../../actions/auth'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'

const LoginPage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      const { username, password } = values
      dispatch(login(username, password))
    },
  })

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />
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
              Log in to your account
            </h2>
            <p className="mb-6 lh-lg">Please enter your details to proceed.</p>
          </div>
          <form
            className="text-start mx-auto"
            style={{ width: 300 }}
            onSubmit={formik.handleSubmit}
          >
            <label className="d-block mb-6">
              <span className="small">Username</span>
              <input
                type="text"
                className="form-control mt-2"
                name="username"
                placeholder="Your username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </label>
            {formik.touched.username && formik.errors.username ? (
              <span className="error">{formik.errors.username}</span>
            ) : null}
            <label className="d-block mb-4">
              <span className="small">Password</span>
              <input
                type="password"
                className="form-control mt-2"
                name="password"
                placeholder="Your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </label>
            {formik.touched.password && formik.errors.password ? (
              <span className="error">{formik.errors.password}</span>
            ) : null}
            <label className="d-flex mb-6">
              <span style={{ fontSize: 12 }}>
                <span>By signing up, you agree to our </span>
                <a className="text-decoration-none" href="#login">
                  Terms, Data Policy, and Cookies Policy.
                </a>
              </span>
            </label>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-dark d-block mb-4">
              Sign In
            </button>
            <span className="text-center d-block" style={{ fontSize: 12 }}>
              <span>Don’t have an account? </span>
              <Link to={'/register'} className="text-decoration-none">
                Sign Up
              </Link>
            </span>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default LoginPage
