import NavBarLanding from './elements/NavBarLanding'

function HeroSection() {
  return (
    <section id="action" className="pb-24 position-relative overflow-hidden">
      <NavBarLanding />
      <div className="container mt-12">
        <div className="row">
          <div className="col-12 col-lg-5">
            <div className="pt-lg-20">
              <h1 className="mb-0 lh-sm mb-7">
                <span>Learn with us.</span> <br />
                <span className="text-primary">Become closer</span>
                <br />
                <span>to the world with words.</span>
              </h1>
              <p className="mb-0 lh-lg mw-md-md mb-6">
                Follow your fellow learners and see their progress in
                Neuword.&nbsp;
              </p>
              <a
                href="#details"
                className="btn btn-lg btn-dark d-block d-md-inline-block"
                style={{ fontSize: 16 }}
              >
                Details
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-7 mt-20 mt-lg-0">
            <div className="d-md-flex flex-md-row justify-content-md-around justify-content-lg-end">
              <div className="me-lg-8">
                <div className="d-none d-xl-block col-12 d-flex justify-content-center">
                  <div className="bg-primary-light p-1 position-absolute top-0 mt-n32">
                    <div className="p-32" />
                  </div>
                </div>
                <img
                  className="img-fluid mx-auto d-block"
                  src="/images/headers/header-5-building.jpg"
                  alt=""
                />
                <img
                  className="img-fluid mx-auto d-block mt-8"
                  src="/images/headers/header-5-building-2.jpg"
                  alt=""
                />
                <div className="d-none d-xl-block d-flex justify-content-center bg-info-light p-1 mt-7 position-absolute bottom-0 mb-n52">
                  <div className="p-32" />
                </div>
              </div>
              <div>
                <div
                  className="d-none d-xl-block d-flex justify-content-center bg-secondary-light p-1 position-absolute top-0 mt-n32"
                  style={{ zIndex: -1 }}
                >
                  <div className="p-32" />
                </div>
                <img
                  className="img-fluid mx-auto d-block mt-8 mt-md-0"
                  src="/images/headers/header-5-building-3.jpg"
                  alt=""
                />
                <img
                  className="img-fluid mx-auto d-block mt-8"
                  src="/images/headers/header-5-building-4.jpg"
                  alt=""
                />
                <div className="d-none d-xl-block d-flex justify-content-center bg-light p-1 mt-8 position-absolute bottom-0 mb-n52">
                  <div className="p-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
