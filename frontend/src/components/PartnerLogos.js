function PartnerLogos() {
  return (
    <section className="py-24 bg-white position-relative">
      <div className="pt-12 pb-36 bg-dark">
        <div className="container">
          <p className="mb-20 lh-lg text-center text-muted">
            Trusted by brands all over the world
          </p>
          <div className="row align-items-center">
            <div className="col-12 col-sm-6 col-md-3 text-center mb-14 mb-md-0 hidden">
              <img
                className="img-fluid d-block mx-auto"
                src="/images/coca-cola-w-xl.svg"
                alt=""
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 text-center mb-14 mb-md-0 hidden">
              <img
                className="img-fluid d-block mx-auto"
                src="/images/apple-w-xl.svg"
                alt=""
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 mb-14 mb-sm-0 hidden">
              <img
                className="img-fluid d-block mx-auto"
                src="/images/sunstar-logo2.svg"
                alt=""
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 hidden">
              <img
                className="img-fluid d-block mx-auto"
                src="/images/sony-w-xl.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="position-absolute top-0 start-0 px-1 bg-primary-light">
        <div className="p-12 px-32" />
      </div>
      <div className="position-absolute bottom-0 end-0 px-1 bg-primary-light">
        <div className="p-12 px-32" />
      </div>
    </section>
  );
}

export default PartnerLogos;
