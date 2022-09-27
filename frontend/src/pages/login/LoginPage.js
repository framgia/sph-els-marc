import NavBarLanding from "../../components/elements/NavBarLanding";
import NavBarSideLanding from "../../components/elements/NavBarSideLanding";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import { getCSRFToken, submitLogin } from "../../services/client/base";
import * as Yup from "yup";

const LogInPage = (props) => {
  const { touched, errors } = props;
  return (
    <>
      <NavBarLanding />
      <NavBarSideLanding />
      <section
        id="login"
        className="py-24 py-lg-36 bg-white"
        style={{
          backgroundImage: 'url("/images/forms/form-1-shadow.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
            <Form className="text-start" action="">
              <label className="d-block mb-6">
                <span className="small">Username</span>
                <Field
                  type="text"
                  className="form-control mt-2"
                  name="username"
                  placeholder="Your username"
                />
                {touched.username && errors.username && (
                  <span className="help-block text-danger">
                    {errors.username}
                  </span>
                )}
              </label>
              <label className="d-block mb-4">
                <span className="small">Password</span>
                <Field
                  type="password"
                  className="form-control mt-2"
                  name="password"
                  placeholder="Your password"
                />
                {touched.password && errors.password && (
                  <span className="help-block text-danger">
                    {errors.password}
                  </span>
                )}
              </label>
              <label className="d-flex mb-6">
                <span style={{ fontSize: 12 }}>
                  <span>By signing up, you agree to our </span>
                  <a className="text-decoration-none" href="#login">
                    Terms, Data Policy, and Cookies Policy.
                  </a>
                </span>
              </label>
              <button type="submit" className="btn btn-dark d-block mb-4">
                Sign In
              </button>
              <span className="text-center d-block" style={{ fontSize: 12 }}>
                <span>Don’t have an account? </span>
                <Link to={"/register"} className="text-decoration-none">
                  Sign Up
                </Link>
              </span>
            </Form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

const LoginFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      username: props.username || "",
      password: props.password || "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  }),
  handleSubmit: async (values) => {
    const { username, password } = values;

    try {
      const csrf = await getCSRFToken();
      //eslint-disable-next-line
      const resp = await submitLogin(csrf, username, password);
    } catch (err) {
      console.error(err);
    }
  },
})(LogInPage);

export default LoginFormik;
