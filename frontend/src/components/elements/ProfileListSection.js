export default function ProfileListSection(props) {
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
