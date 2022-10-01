import Footer from '../../components/Footer'
import NavBarLanding from '../../components/elements/NavBarLanding'
import useLessonResults from '../../hooks/useLessonResults'
import { useParams, Navigate } from 'react-router-dom'
import LoadResultData from '../../components/elements/LoadResultData'

export default function CategoryResultsPage() {
  const { category_id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))

  const { isLoading, resultData, error } = useLessonResults(
    +category_id,
    user.pk,
  )

  if (isLoading) {
    return (
      <>
        <NavBarLanding />
        Loading...
        <Footer />
      </>
    )
  }

  if (JSON.stringify(error) !== '{}') {
    return (
      <>
        <NavBarLanding />
        <Navigate to={`/404/`} />
        <Footer />
      </>
    )
  }
  return (
    <>
      <NavBarLanding />
      <LoadResultData resultData={resultData} />
      <Footer />
    </>
  )
}
