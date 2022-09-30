import { Link } from "react-router-dom";

function CategoryCard({ category_id }) {
  return (
    <div className="p-6 mb-4 border rounded-2" key={category_id}>
      <div className="row align-items-center">
        <div className="col-12 col-md-auto mb-4 mb-md-0">
          <div className="d-inline-flex align-items-center">
            <div>
              <p className="mb-1 fw-bold text-dark">
                <Link
                  className="text-decoration-none text-dark"
                  to={`/category/${category_id}/`}
                >
                  <span>Lesson {category_id}</span>
                </Link>
                <span
                  className="d-inline-block align-middle ms-1 rounded-circle bg-danger"
                  style={{ width: 4, height: 4 }}
                />
              </p>
              <p className="medium mb-0">
                <span>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium ...
                </span>
                <span className="ms-1">&amp;centerdot; 1h ago</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoryList() {
  return (
    <section className="py-6 mx-20">
      <div className="container">
        <CategoryCard category_id={'1'} />
        <CategoryCard category_id={'2'} />
        <CategoryCard category_id={'3'} />
      </div>
    </section>
  );
}
