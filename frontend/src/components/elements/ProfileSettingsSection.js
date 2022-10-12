export default function ProfileSettingsSection(props) {
  return (
    <section className="position-relative py-8 bg-white overflow-hidden">
      <img
        className="d-none d-lg-block position-absolute top-0 end-0 col-6"
        src="/images/forms/shadows-big.png"
        alt="form background"
      />
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 mb-12 mb-lg-0">
            <div className="mw-md mx-auto">
              <h2 className="mb-12 display-4 font-heading">Edit Profile</h2>
              {props.children}
            </div>
          </div>
          <div className="position-relative col-12 col-lg-6 pt-12 pt-lg-0">
            <img
              className="position-absolute top-0 start-0 bottom-0 h-100 w-100"
              src="/images/forms/shadows-big.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}
