import { Link } from "react-router-dom";

const FollowingCard = (following) => {
  const listItems = [];
  for (let i = 0; i < following["following"].length; i++) {
    listItems.push(
      <div className="p-6 mb-4 border rounded-2" key={i}>
        <div className="row align-items-center">
          <div className="col-12 col-md-auto mb-4 mb-md-0">
            <div className="d-inline-flex align-items-center">
              <span
                className="d-inline-flex flex-shrink-0 align-items-center justify-content-center me-4 rounded-2 bg-primary-light text-primary"
                style={{ width: 72, height: 72 }}
              >
                <img
                  src={`http://localhost:8000/media/${following["following"][i].profile_picture}`}
                  alt={`${following["following"][i].username}`}
                  style={{ width: 60, height: 60 }}
                />
              </span>
              <div>
                <Link to={`/profile/${following["following"][i].following}`}>
                  <p className="mb-1 fw-bold text-dark">
                    <span>{following["following"][i].username}</span>
                    <span
                      className="d-inline-block align-middle ms-1 rounded-circle bg-danger"
                      style={{ width: 4, height: 4 }}
                    />
                  </p>
                </Link>
                <p className="medium mb-0">
                  <span>{following["following"][i].email}</span>
                  <span className="ms-1">&amp;centerdot; 1h ago</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col col-md-auto ms-auto">
            <a
              className="btn d-inline-flex align-items-center justify-content-center p-0 btn-outline-light shadow rounded-2"
              href="#dash"
              style={{ width: 40, height: 40 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
                className=""
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{listItems}</>;
};

export default FollowingCard;
