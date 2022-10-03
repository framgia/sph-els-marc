import { useParams, Navigate } from 'react-router-dom'
import useLessonExists from '../../hooks/useLessonExists'

export default function CategoryPage() {
  const { category_id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  //eslint-disable-next-line
  const { isLoading, exists, error } = useLessonExists(+category_id, user.pk)

  if (exists) {
    return <Navigate to={`/category/results/${category_id}/`} />
  }

  return <>Category ID {category_id}</>
}
