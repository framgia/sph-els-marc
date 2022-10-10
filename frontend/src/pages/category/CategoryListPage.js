import Footer from '../../components/Footer'
import Search from './Search'
import Pagination from '../../components/elements/Pagination'
import NavBarLanding from '../../components/elements/NavBarLanding'
import CategoryList from '../../components/elements/CategoryList'
import CategorySection from '../../components/elements/CategorySection'
import CategoryService from '../../services/category.service'
import { useState, useEffect } from 'react'

export default function CategoryListPage() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [nextPage, setNextPage] = useState(null)
  const [previousPage, setPreviousPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lessons, setLessons] = useState([])
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true)
      try {
        const response = await CategoryService.getCategories(query, page)
        setLessons(response.data.results)
        setNextPage(response.data.next)
        setPreviousPage(response.data.previous)
        setCount(response.data.count)
        setTotalPages(response.data.total_pages)
        setPageSize(response.data.page_size)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }
    fetchLessons()
  }, [page, query, count, nextPage, previousPage])

  return (
    <div>
      <NavBarLanding />
      <CategorySection />
      <Search setQuery={setQuery} />
      <div className="container">
        {loading ? 'Loading' : <CategoryList lessons={lessons} />}
        {error && <div>Something went wrong</div>}

        <Pagination
          count={count}
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          nextPage={nextPage}
          previousPage={previousPage}
          setCount={setCount}
          setPage={setPage}
          setNextPage={setNextPage}
          setPreviousPage={setPreviousPage}
        />
      </div>
      <Footer />
    </div>
  )
}
