import Footer from '../../components/Footer'
import NavBarLanding from '../../components/elements/NavBarLanding'
import CategoryList from '../../components/elements/CategoryList'
import CategorySection from '../../components/elements/CategorySection'
import useGetLessons from '../../hooks/useGetLessons'

export default function CategoryListPage() {
  const { isLoading, lessons, error } = useGetLessons()

  return (
    <div>
      <NavBarLanding />
      <CategorySection />
      {isLoading ? 'Loading' : <CategoryList lessons={lessons} />}
      {error && <div>Something went wrong</div>}
      <Footer />
    </div>
  )
}
