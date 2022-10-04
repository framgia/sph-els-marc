import { Link } from 'react-router-dom'
//part of AdminPage
const AdminSection = () => {
  return (
    <section className="py-6 mx-20">
      <Link to={'/'}>
        <nav className="container nav-item">
          <h3 className="nav-link fw-bold text-dark">Admin | Categories </h3>
        </nav>
      </Link>
    </section>
  )
}

export default AdminSection
