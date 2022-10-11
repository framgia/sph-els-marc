import Footer from '../../components/Footer'
import NavBarLanding from '../../components/elements/NavBarLanding'
import Pagination from '../../components/elements/Pagination'
import userService from '../../services/user.service'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ProfileListPage() {
  const [profiles, setProfiles] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [previousPage, setPreviousPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true)
      try {
        const response = await userService.getUserProfiles(page)
        setProfiles(response.data.results)
        setNextPage(response.data.next)
        setPreviousPage(response.data.previous)
        setCurrentPage(response.data.current)
        setCount(response.data.count)
        setTotalPages(response.data.total_pages)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }
    fetchProfiles()
  }, [page, count, nextPage, previousPage, currentPage, totalPages])

  return (
    <>
      <NavBarLanding />
      <ProfileListSection>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <ProfileList profiles={profiles} />
        <Pagination
          count={count}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          nextPage={nextPage}
          previousPage={previousPage}
          currentPage={currentPage}
          setCount={setCount}
          setNextPage={setNextPage}
          setPreviousPage={setPreviousPage}
        />
      </ProfileListSection>
      <Footer />
    </>
  )
}

function ProfileListSection(props) {
  return (
    <section className="py-6 bg-white overflow-hidden">
      <div className="position-relative container">
        <img
          className="position-absolute top-0 start-0 mt-n44 ms-n60"
          src="/images/profile/profile-1-shadow.png"
          alt=""
        />
        <div className="position-relative">
          <div className="row align-items-md-center">
            <div className="col-12 col-md-5 mb-6 mb-md-0">
              <h1 className="mb-0 lh-sm font-heading">Profiles</h1>
            </div>
            <div className="col-12 col-md-7">
              <p className="mb-0 lh-lg">
                Meet your fellow learners and experts...
              </p>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </section>
  )
}

function ProfileList(props) {
  return (
    <div className="row mt-20 mt-xl-24">
      {props.profiles.length > 0 &&
        props.profiles.map((profile, index) => (
          <ProfileDetail key={index} bgid={index} profile={profile} />
        ))}
    </div>
  )
}

const ProfileDetail = (props) => {
  const { bgid, profile } = props
  const name =
    profile.user.first_name + ' ' + profile.user.last_name === ' '
      ? profile.user.username
      : profile.user.first_name + ' ' + profile.user.last_name
  const picture = process.env.REACT_APP_MEDIA_URL + profile.profile_picture
  const role = profile.user.is_superuser ? 'Expert' : 'Learner'
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-14">
      <Link to={`/profile/${profile.id}`} className={'text-decoration-none'}>
        <div className="mx-auto mw-xs px-7">
          <div className="position-relative mb-12">
            <img
              className="img-fluid position-relative"
              src={picture}
              width={264}
              height={264}
              style={{ zIndex: 1 }}
              alt=""
            />
            {bgid % 3 === 0 && (
              <div className="bg-primary-light position-absolute start-0 top-0 w-100 h-100 mt-6 ms-n6" />
            )}
            {bgid % 3 === 1 && (
              <div className="bg-danger-light position-absolute start-0 top-0 w-100 h-100 mt-n6 ms-6" />
            )}
            {bgid % 3 === 2 && (
              <div className="bg-success-light position-absolute start-0 top-0 w-100 h-100 mt-6 ms-6" />
            )}
          </div>
          <h5 className="mb-0 fw-bold lh-lg font-heading">{name}</h5>
          <span className="text-muted small "> {role} </span>
        </div>
      </Link>
    </div>
  )
}
