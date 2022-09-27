import React from "react";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
function Footer() {
  return (
    <section className="pt-20 pt-md-24 bg-dark">
      <div className="container">
        <div className="row pb-12">
          <div className="col-12 col-sm-10 col-xl-4 mb-12 mb-xl-0">
            <Link to="#">
              <img src="images/title.svg" alt="" width={300} />
            </Link>
            <p className="mt-6 lh-lg mw-xs mb-0 pe-4 text-light">
              Become closer to the world, one word at a time
            </p>
          </div>
          <div className="col-12 col-sm-4 col-xl-3 mb-12 mb-lg-0">
            <h5 className="mb-4 fw-bold text-light lh-lg">Product</h5>
            <ul className="list-unstyled mb-0">
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Lessons
                </Link>
              </li>
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Words
                </Link>
              </li>
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Admin | Language Experts
                </Link>
              </li>
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Students
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-4 col-xl-3 mb-12 mb-lg-0">
            <h5 className="mb-4 fw-bold text-light lh-lg">Get Started</h5>
            <ul className="list-unstyled mb-0">
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  New account
                </Link>
              </li>
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Log in
                </Link>
              </li>
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Blog (Soon)
                </Link>
              </li>
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-4 col-xl-2">
            <h5 className="mb-4 fw-bold text-light lh-lg">See More</h5>
            <ul className="list-unstyled mb-0">
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Repository
                </Link>
              </li>
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Developer
                </Link>
              </li>
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Story
                </Link>
              </li>
              <li onClick={() => Swal.fire("To be implemented later!")}>
                <Link to={""} className="text-decoration-none link-light lh-lg">
                  Tasks
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-12 py-md-16" style={{ backgroundColor: "#2C2C2C" }}>
        <div className="container">
          <div className="row">
            <div className="order-last order-md-first col-12 col-sm-4 col-md-6 col-lg-4 col-xl-4">
              <p className="text-muted small mb-0 lh-sm">
                © Neuword. 2022 | Marc Jermaine Pontiveros
              </p>
            </div>
            <div className="col-12 col-lg-3 col-xl-4 mb-12 mb-md-0">
              <div className="d-flex flex-row justify-content-sm-center justify-content-lg-end flex-wrap">
                <Link to={""} className="text-decoration-none">
                  <img className="img-fluid" src="/logos/twitter.svg" alt="" />
                </Link>
                <Link to={""} className="mx-7 text-decoration-none">
                  <img className="img-fluid" src="/logos/google.svg" alt="" />
                </Link>
                <Link to={""} className="text-decoration-none">
                  <img className="img-fluid" src="/logos/facebook.svg" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
