import { Link } from 'react-router-dom'

export default function ProfileList(props) {
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
  const picture = profile.profile_picture
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
