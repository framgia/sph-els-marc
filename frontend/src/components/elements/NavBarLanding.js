import { Link } from "react-router-dom";
import { useState } from "react";
import NavBarSideLanding from "./NavBarSideLanding";
import { useSelector } from "react-redux";

function NavBarLanding() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      <nav className="navbar py-10 navbar-expand-lg navbar-light bg-transparent">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="images/neuword-logo.svg" alt="" width={160} />
          </Link>
          <button
            className="btn p-0 d-lg-none navbar-burger"
            onClick={() => setOpen(!open)}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.5 7C3.22386 7 3 6.77614 3 6.5C3 6.22386 3.22386 6 3.5 6H20.5C20.7761 6 21 6.22386 21 6.5C21 6.77614 20.7761 7 20.5 7H3.5ZM3.5 12C3.22386 12 3 11.7761 3 11.5C3 11.2239 3.22386 11 3.5 11H20.5C20.7761 11 21 11.2239 21 11.5C21 11.7761 20.7761 12 20.5 12H3.5ZM3 16.5C3 16.7761 3.22386 17 3.5 17H20.5C20.7761 17 21 16.7761 21 16.5C21 16.2239 20.7761 16 20.5 16H3.5C3.22386 16 3 16.2239 3 16.5Z"
                fill="#000"
              />
            </svg>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-10 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">
                  Learn
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Community (Soon)
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Blog (Soon)
                </Link>
              </li>
            </ul>
            <div className="ms-auto">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="btn btn-dark me-3">
                    Dashboard
                  </Link>
                  <Link to="/logout" className="btn btn-dark">
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-dark me-3">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-dark mt-3 mt-md-0">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <NavBarSideLanding open={open} setOpen={setOpen} />
    </>
  );
}

export default NavBarLanding;
