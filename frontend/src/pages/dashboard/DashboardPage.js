import { useState } from 'react'
import { Link } from 'react-router-dom'
import ActivityStream from '../../components/elements/ActivityStream'
import WordsLearnedStream from '../../components/elements/WordsLearnedStream'
import FollowerStream from '../../components/elements/FollowerStream'
import FollowingStream from '../../components/elements/FollowingStream'
import NavBarLanding from '../../components/elements/NavBarLanding'
import Footer from '../../components/Footer'
import useProfileDetails from '../../hooks/useProfileDetails'
import useGetAllActivities from '../../hooks/useGetAllActivities'

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user'))
  const views = ['Activities', 'Following', 'Followers', 'Words Learned']
  const [view, setView] = useState(views[0])

  const { isLoading, userData, userPicData } = useProfileDetails(user.pk)
  const {
    isLoading: isLoadingActivity,
    activities,
    error,
  } = useGetAllActivities(user.pk)

  if (isLoading || isLoadingActivity) {
    return <div>Loading...</div>
  } else {
    const { followers, following } = userData
    return (
      <>
        <NavBarLanding />

        <section id="dash" className="row py-6 mx-20">
          <div className="col-12 col-lg-6">
            <section className="py-6">
              <div className="container">
                <div className="position-relative p-8 border rounded-2">
                  <h3> Home </h3>
                  <div className="mb-8 text-center">
                    <img
                      className="img-fluid rounded-2 mb-6"
                      style={{ width: 256, height: 256 }}
                      src={userPicData.profile_picture}
                      alt=""
                    />
                    <h6 className="fw-bold">
                      {userData.user.first_name === ''
                        ? userData.user.username
                        : userData.user.first_name}
                    </h6>
                    <p className="mb-4">
                      {userData.user.is_superuser ? 'Expert' : 'Student'}
                    </p>
                    <p>{userData.user.bio ? userData.user.bio : 'No bio. '}</p>
                    <div className="row">
                      <button
                        onClick={() => setView(views[1])}
                        className="col-lg-6 btn d-inline-block
                        btn-outline-dark m-auto col-12 mb-3 mb-lg-0"
                        href="#dash"
                      >
                        {userData.following_count} Following
                      </button>
                      <button
                        onClick={() => setView(views[2])}
                        className="col-12 col-lg-6 btn d-inline-block
                        btn-outline-dark"
                        href="#dash"
                      >
                        {userData.follower_count} Follower
                        {userData.follower_count === 1 ? '' : 's'}
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
                      {userData.lessons_learned}
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

                    <p className="mb-0">{userData.words_learned}</p>
                  </div>
                  <Link
                    className="text-decoration-none"
                    to={`/profile/${userData.id}`}
                  >
                    <button className="btn me-4 mb-3 w-100 d-flex align-items-center justify-content-center btn-outline-dark">
                      <span> Profile </span>
                    </button>
                  </Link>
                  <button
                    onClick={() => setView(views[0])}
                    className="btn me-4 w-100 d-flex align-items-center justify-content-center btn-outline-dark"
                  >
                    <span> Feed </span>
                  </button>
                  <button
                    onClick={() => setView(views[3])}
                    className="btn my-2 me-4 w-100 d-flex align-items-center justify-content-center btn-outline-dark"
                  >
                    <span> Words Learned </span>
                  </button>
                </div>
              </div>
            </section>
          </div>
          {view === views[0] && (
            <ActivityStream
              isLoadingActivity={isLoadingActivity}
              activities={activities}
              error={error}
            />
          )}
          {view === views[1] && <FollowingStream following={following} />}
          {view === views[2] && <FollowerStream followers={followers} />}
          {view === views[3] && (
            <WordsLearnedStream user_profile_taker_id={user.pk} />
          )}
        </section>
        <Footer />
      </>
    )
  }
}
