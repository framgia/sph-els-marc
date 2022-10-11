import Footer from '../../components/Footer'
import NavBarLanding from '../../components/elements/NavBarLanding'
import Pagination from '../../components/elements/Pagination'
import userService from '../../services/user.service'
import { useState, useEffect } from 'react'
import ProfileList from '../../components/elements/ProfileList'
import ProfileListSection from '../../components/elements/ProfileListSection'

export default function ProfileListPage() {
  const [profiles, setProfiles] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [previousPage, setPreviousPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true)
      try {
        const response = await userService.getUserProfiles(page)
        setProfiles(response.data.results)
        setNextPage(response.data.next)
        setPreviousPage(response.data.previous)
        setCurrentPage(response.data.current)
        setCount(response.data.count)
        setTotalPages(response.data.total_pages)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }
    fetchProfiles()
  }, [page, count, nextPage, previousPage, currentPage, totalPages])

  return (
    <>
      <NavBarLanding />
      <ProfileListSection>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <ProfileList profiles={profiles} />
        <Pagination
          count={count}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          nextPage={nextPage}
          previousPage={previousPage}
          currentPage={currentPage}
          setCount={setCount}
          setNextPage={setNextPage}
          setPreviousPage={setPreviousPage}
        />
      </ProfileListSection>
      <Footer />
    </>
  )
}
