import { Spinner } from '../../components/elements/Spinner';
import LoginForm from './LoginForm';
import NavBarLanding from '../../components/elements/NavBarLanding';
import NavBarSideLanding from '../../components/elements/NavBarSideLanding';
import Footer from '../../components/Footer';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Spinner />;
  }

  if (isLoggedIn) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <>
      <NavBarLanding />
      <NavBarSideLanding />
      <section
        id='login'
        className='py-24 py-lg-36 bg-white'
        style={{
          backgroundImage: 'url("/images/forms/form-1-shadow.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <div className='container'>
          <div className='text-center mw-sm px-3 mx-auto'>
            <img className='img-fluid' src='images/neuword-logo.svg' alt='' />
            <h2 className='mb-2 lh-sm mt-6 font-heading'>
              Log in to your account
            </h2>
            <LoginForm />
            <p className='mb-6 lh-lg'>Please enter your details to proceed.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LoginPage;
