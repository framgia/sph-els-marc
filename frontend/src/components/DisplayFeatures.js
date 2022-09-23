import React from "react";

function DisplayFeatures() {
  return (
    <section
      id="details"
      className="py-28 py-xl-28"
      style={{
        backgroundImage: 'url("/images/features/features-5-shadow.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-5 me-auto mb-12 mb-xl-0">
            <h2 className="display-5 lh-sm mb-10 font-heading">
              A new way to learn language, <br /> one word at a time
            </h2>

            <a
              href="#action"
              className="btn btn-lg btn-dark d-block d-md-inline-block"
              style={{ fontSize: 16 }}
            >
              Getting Started
            </a>
          </div>
          <div className="col-12 col-md-8 mx-auto col-xl-6">
            <div className="d-lg-flex align-items-center mb-10">
              <img
                className="img-fluid mb-8 mb-lg-0"
                src="/icons/rounded-document-clean.svg"
                alt=""
              />
              <p className="lh-lg ms-lg-8 mb-0">Enhanced Vocabulary Skills</p>
            </div>
            <div className="d-lg-flex align-items-center mb-10">
              <img
                className="img-fluid mb-8 mb-lg-0"
                src="/icons/rounded-filters.svg"
                alt=""
              />
              <p className="lh-lg mb-0 ms-lg-8">
                See your and your friends' progress.
              </p>
            </div>
            <div className="d-lg-flex align-items-center">
              <img
                className="img-fluid mb-8 mb-lg-0"
                src="/icons/rounded-users.svg"
                alt=""
              />
              <p className="lh-lg ms-lg-8 mb-0">
                Follow your friends. Rediscover the beauty of language with
                Neuword. We make learning new words fun and easy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DisplayFeatures;
