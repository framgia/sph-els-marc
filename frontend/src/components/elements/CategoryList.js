import { Link } from 'react-router-dom'

function CategoryCard({ lesson }) {
  const { id, category_name, category_description } = lesson
  return (
    <Link className="text-decoration-none text-dark" to={`/category/${id}/`}>
      <div className="p-6 mb-4 border rounded-2">
        <div className="row align-items-center">
          <div className="col-12 col-md-auto mb-4 mb-md-0">
            <div className="d-inline-flex align-items-center">
              <div key={id}>
                <p className="mb-1 fw-bold text-dark">
                  <span> {category_name} </span>
                </p>
                <p className="medium mb-0">
                  <span>{category_description}</span>
                  <span className="ms-1"> 1h ago</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function CategoryList({ lessons }) {
  return (
    <section className="py-6 mx-lg-20">
      <div className="container">
        {lessons.length > 0 &&
          lessons.map((lesson, index) => (
            <CategoryCard lesson={lesson} key={index} />
          ))}
      </div>
    </section>
  )
}
