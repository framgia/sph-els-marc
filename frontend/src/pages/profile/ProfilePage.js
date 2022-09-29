import NavBarLanding from "../../components/elements/NavBarLanding";
import UserService from "../../services/user.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const views = ["Activities", "Following", "Followers"];
  const [userData, setUserData] = useState({});
  const [userPicData, setUserPicData] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [view, setView] = useState(views[0]);

  console.log("user_id", user.pk);
  console.log("id", id);

  useEffect(() => {
    UserService.getUserProfile(id)
      .then((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status === 404) {
          setUserData({ error: "User not found" });
        } else if (response[0].status === 200 && response[1].status === 200) {
          setisLoading(false);
          setUserData(response[0].data);
          setUserPicData(response[1].data);
        } else {
          console.error("Error: ", response[0]);
          console.error("Error: ", response[1]);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [id]);

  if (userData.error) {
    return <Navigate to="/404/user-not-found" replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    const { followers, following } = userData;
    return (
      <>
        <NavBarLanding />
        <section id="profile" className="row">
          <div className="col-12 col-lg-6">
            <section className="py-6">
              <div className="container">
                <div className="position-relative p-8 border rounded-2">
                  <h3> User Profile </h3>
                  <div className="mb-8 text-center">
                    <img
                      className="img-fluid rounded-2 mb-6"
                      style={{ width: 256, height: 256 }}
                      src={userPicData.profile_picture}
                      alt=""
                    />
                    <h6 className="fw-bold">
                      {" "}
                      {userData.user.first_name === ""
                        ? userData.user.username
                        : userData.user.first_name}
                    </h6>
                    <p className="mb-4">
                      {userData.user.is_superuser ? "Admin" : "Student"}
                    </p>
                    <p>{userData.user.bio ? userData.user.bio : "No bio. "}</p>
                    <div className="row">
                      <button
                        onClick={() => setView(views[1])}
                        className="col-lg-6 btn d-inline-block
                        btn-outline-primary m-auto col-12 mb-3 mb-lg-0"
                        href="#dash"
                      >
                        {userData.following_count} Following
                      </button>
                      <button
                        onClick={() => setView(views[2])}
                        className="col-12 col-lg-6 btn d-inline-block
                        btn-outline-primary"
                        href="#dash"
                      >
                        {userData.follower_count} Follower
                        {userData.follower_count === 1 ? "" : "s"}
                      </button>
                    </div>
                  </div>
                  <div className="d-flex d-sm-none mb-6 align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth={2}
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        className="me-3"
                      >
                        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                      </svg>
                      <p className="mb-0 ">Email address</p>
                    </div>
                    <p className="mb-0 ">{userData.user.email}</p>
                  </div>
                  <div className="d-flex mb-6 align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        width={24}
                        height={24}
                        stroke="currentColor"
                        aria-hidden="true"
                        className="me-3"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                      <p className="mb-0">Lessons Completed</p>
                    </div>
                    <p className="mb-0" id="lessons_completed">
                      0
                    </p>
                  </div>
                  <div className="d-flex mb-6 align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        width={24}
                        height={24}
                        stroke="currentColor"
                        aria-hidden="true"
                        className="me-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <p className="mb-0" id="words_completed">
                        Words Learned
                      </p>
                    </div>
                    <p className="mb-0">0</p>
                  </div>
                  {user.pk === +id ? "" : <FollowButton />}
                </div>
              </div>
            </section>
          </div>
          {view === views[0] && <ActivityStream />}
          {view === views[1] && <FollowingStream following={following} />}
          {view === views[2] && <FollowerStream followers={followers} />}
        </section>
      </>
    );
  }
}

const FollowButton = () => {
  return (
    <button
      className="btn me-4 w-100 d-flex align-items-center justify-content-center btn-outline-primary"
      href="#dash"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        className="me-2"
      >
        <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
      </svg>
      <span> Follow / Unfollow </span>
    </button>
  );
};

const FollowerStream = (followers) => {
  return (
    <>
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <h3> Followers </h3>
              {/** Here */}
              <FollowerCard followers={followers.followers} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const FollowingCard = (following) => {
  console.log("Follower card", following["following"]);
  const listItems = [];
  for (let i = 0; i < following["following"].length; i++) {
    listItems.push(
      <div className="p-6 mb-4 border rounded-2">
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
                <p className="mb-1 fw-bold text-dark">
                  <span>{following["following"][i].username}</span>
                  <span
                    className="d-inline-block align-middle ms-1 rounded-circle bg-danger"
                    style={{ width: 4, height: 4 }}
                  />
                </p>
                <p className="medium mb-0">
                  <span>{following["following"][i].email}</span>
                  <span className="ms-1">&amp;centerdot; 1h ago</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col col-md-auto ms-auto">
            <button className="btn d-inline-flex align-items-center justify-content-center p-0 shadow rounded-2">
              {" "}
              Unfollow{" "}
            </button>
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

const FollowingStream = (following) => {
  return (
    <>
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <h3> Following </h3>
              <FollowingCard following={following.following} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const FollowerCard = (followers) => {
  console.log("Follower card", followers["followers"]);
  const listItems = [];
  for (let i = 0; i < followers["followers"].length; i++) {
    listItems.push(
      <div className="p-6 mb-4 border rounded-2">
        <div className="row align-items-center">
          <div className="col-12 col-md-auto mb-4 mb-md-0">
            <div className="d-inline-flex align-items-center">
              <span
                className="d-inline-flex flex-shrink-0 align-items-center justify-content-center me-4 rounded-2 bg-primary-light text-primary"
                style={{ width: 72, height: 72 }}
              >
                <img
                  src={`http://localhost:8000/media/${followers["followers"][i].profile_picture}`}
                  alt={`${followers["followers"][i].username}`}
                  style={{ width: 60, height: 60 }}
                />
              </span>
              <div>
                <p className="mb-1 fw-bold text-dark">
                  <span>{followers["followers"][i].username}</span>
                  <span
                    className="d-inline-block align-middle ms-1 rounded-circle bg-danger"
                    style={{ width: 4, height: 4 }}
                  />
                </p>
                <p className="medium mb-0">
                  <span>{followers["followers"][i].email}</span>
                  <span className="ms-1">&amp;centerdot; 1h ago</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col col-md-auto ms-auto">
            <button className="btn d-inline-flex align-items-center justify-content-center p-0 shadow rounded-2">
              {" "}
              Unfollow{" "}
            </button>
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

const ActivityStream = () => {
  return (
    <>
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <h3> Activities </h3>

              <div className="p-6 mb-4 border rounded-2">
                <div className="row align-items-center">
                  <div className="col-12 col-md-auto mb-4 mb-md-0">
                    <div className="d-inline-flex align-items-center">
                      <span
                        className="d-inline-flex flex-shrink-0 align-items-center justify-content-center me-4 rounded-2 bg-primary-light text-primary"
                        style={{ width: 48, height: 48 }}
                      >
                        Aa
                      </span>
                      <div>
                        <p className="mb-1 fw-bold text-dark">
                          <span>Ashton Cox</span>
                          <span
                            className="d-inline-block align-middle ms-1 rounded-circle bg-danger"
                            style={{ width: 4, height: 4 }}
                          />
                        </p>
                        <p className="medium mb-0">
                          <span>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium ...
                          </span>
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
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6 mb-4 border rounded-2">
                <div className="row align-items-center">
                  <div className="col-12 col-md-auto mb-4 mb-md-0">
                    <div className="d-inline-flex align-items-center">
                      <span
                        className="d-inline-flex flex-shrink-0 align-items-center justify-content-center me-4 rounded-2 bg-primary-light text-primary"
                        style={{ width: 48, height: 48 }}
                      >
                        Aa
                      </span>
                      <div>
                        <p className="mb-1 fw-bold text-dark">
                          <span>Ashton Cox</span>
                          <span
                            className="d-inline-block align-middle ms-1 rounded-circle bg-danger"
                            style={{ width: 4, height: 4 }}
                          />
                        </p>
                        <p className="medium mb-0">
                          <span>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium ...
                          </span>
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
