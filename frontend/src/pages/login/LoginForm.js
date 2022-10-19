import { useFormik } from 'formik';
import authService from '../../services/auth.service';
import { loginRequest, loginFail, loginSuccess } from '../../slice/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';

const LoginForm = () => {
  const { message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
      dispatch(loginRequest());
      const { username, password } = values;

      authService.login(username, password).then((response) => {
        const [status, axiosData] = response;

        if (axiosData['status'] === 200) {
          dispatch(loginSuccess(status));
        } else {
          const errors = axiosData['response']['data'];
          const key = Object.keys(errors)[0];
          const value = errors[key][0];
          dispatch(loginFail(`${value}`));
        }
      });
    },
  });

  return (
    <form
      className='text-start mx-auto'
      style={{ width: 300 }}
      onSubmit={formik.handleSubmit}
    >
      <label className='d-block mb-6'>
        <span className='small'>Username</span>
        <input
          type='text'
          className='form-control mt-2'
          name='username'
          data-testid='login-username'
          placeholder='Your username'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
      </label>
      {formik.touched.username && formik.errors.username ? (
        <span className='error'>{formik.errors.username}</span>
      ) : null}
      <label className='d-block mb-4'>
        <span className='small'>Password</span>
        <input
          type='password'
          className='form-control mt-2'
          name='password'
          data-testid='login-password'
          placeholder='Your password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
      </label>
      {formik.touched.password && formik.errors.password ? (
        <span className='error'>{formik.errors.password}</span>
      ) : null}
      <label className='d-flex mb-6'>
        <span style={{ fontSize: 12 }}>
          <span>By signing up, you agree to our </span>
          <a className='text-decoration-none' href='#login'>
            Terms, Data Policy, and Cookies Policy.
          </a>
        </span>
      </label>
      {message && (
        <div className='form-group'>
          <div className='alert alert-danger' role='alert'>
            {message}
          </div>
        </div>
      )}
      <button
        type='submit'
        data-testid='login-submit'
        className='btn btn-dark d-block mb-4'
      >
        Sign In
      </button>
      <span className='text-center d-block' style={{ fontSize: 12 }}>
        <span>Don’t have an account? </span>
        <Link to={'/register'} className='text-decoration-none'>
          Sign Up
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
