export default function DashboardPage() {
  return (
    <div id="dash" className="row">
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <div className="mb-8 text-center">
                <img
                  className="img-fluid rounded-2 mb-6"
                  style={{ width: 64, height: 64 }}
                  src="https://images.unsplash.com/photo-1593789382576-54f489574d26?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                  alt=""
                />
                <h6 className="fw-bold">Super Mario</h6>
                <p className="mb-4">Student</p>
                <p>
                  I distinguish three main text objectives could be merely to
                  inform people. A second could be persuade people. You want
                  people to bay objective.
                </p>
                <div className="row">
                  <a
                    className="col-lg-6 btn d-inline-block btn-outline-primary m-auto col-12 mb-3 mb-lg-0"
                    href="#dash"
                  >
                    32 Following
                  </a>
                  <a
                    className="col-12 col-lg-6 btn d-inline-block btn-outline-primary"
                    href="#dash"
                  >
                    35 Followers
                  </a>
                </div>
              </div>
              <div className="d-flex mb-6 align-items-center justify-content-between">
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
                  <p className="mb-0">Email address</p>
                </div>
                <p className="mb-0">mario@gmail.com</p>
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
                <p className="mb-0">2</p>
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
                  <p className="mb-0">Words Learned</p>
                </div>
                <p className="mb-0">15</p>
              </div>
              <a
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
                <span>Profile</span>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
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
    </div>
  );
}
