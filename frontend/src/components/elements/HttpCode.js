import { Link } from "react-router-dom";

function HttpCode() {
  return (
    <div
      className="mw-xl mx-auto text-center position-relative"
      style={{ zIndex: 3 }}
    >
      <h3 className="mb-0 mb-7 text-primary display-5 font-heading">
        Error 404
      </h3>
      <p className="mb-0 mb-10 mb-0">
        Sorry, we can't find that page or something has gone wrong...
      </p>
      <Link to={"/"} className="btn btn-dark d-block d-md-inline-block mb-10">
        Go back to Homepage
      </Link>
    </div>
  );
}

export default HttpCode;
