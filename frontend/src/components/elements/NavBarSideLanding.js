import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBarSideDashboard({ open, setOpen }) {
  const { isLoggedIn } = useSelector((state) => state.auth)
  return (
    <div
      className={
        `navbar-menu position-fixed top-0 start-0 bottom-0 w-75 mw-sm ` +
        (open ? '' : 'd-none')
      }
      style={{ zIndex: 9999 }}
    >
      <div
        className="navbar-close position-fixed top-0 start-0 end-0 bottom-0 bg-dark"
        style={{ opacity: '75%' }}
      />
      <nav className="position-relative h-100 w-100 d-flex flex-column py-10 px-6 bg-white overflow-auto">
        <div className="d-flex align-items-center mb-12">
          <Link to="/" className="me-auto h4 mb-0 text-decoration-none">
            <img src="images/neuword-logo.svg" alt="" width={160} />
          </Link>
          <button
            className="btn navbar-close"
            type="button"
            aria-label="Close"
            onClick={() => setOpen(!open)}
          >
            <img src="/images/x2.svg" alt="" />
          </button>
        </div>
        <div>
          <ul className="nav flex-column">
            <li className="nav-item py-3">
              <Link to="/" className="nav-link fw-bold text-dark">
                Learn
              </Link>
            </li>
            <li className="nav-item py-3">
              <Link to="/category/" className="nav-link fw-bold text-dark">
                Lessons
              </Link>
            </li>
            <li className="nav-item py-3">
              <Link to="/profile/" className="nav-link fw-bold text-dark">
                Profiles
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto">
          <div className="py-6">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="btn btn-dark w-100 mb-3">
                  Dashboard
                </Link>
                <Link to="/logout" className="btn btn-dark w-100">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-dark w-100 mb-3">
                  Login
                </Link>
                <Link to="/register" className="btn btn-dark w-100">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBarSideDashboard
