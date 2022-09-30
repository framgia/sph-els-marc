const ActivityStream = () => {
  return (
    <>
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <h3> News Feed </h3>

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

export default ActivityStream;
