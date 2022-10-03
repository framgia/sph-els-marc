import { useParams, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LessonDescription from '../../components/elements/LessonDescription'
import DisplayQuestion from '../../components/elements/DisplayQuestion'
import StartButton from '../../components/elements/StartButton'
import Footer from '../../components/Footer'
import NavBarLanding from '../../components/elements/NavBarLanding'
import useLessonExists from '../../hooks/useLessonExists'
import useGetLesson from '../../hooks/useGetLesson'

export default function CategoryPage() {
  const { category_id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [quizStart, setQuizStart] = useState(false)
  const [numItems, setNumItems] = useState(0)

  const { isLoading, exists, error } = useLessonExists(+category_id, user.pk)
  const {
    isLoading: isLoadingLesson,
    lesson,
    error: errorLesson,
  } = useGetLesson(+category_id)

  if (exists) {
    return <Navigate to={`/category/results/${category_id}/`} />
  }

  if (isLoading || isLoadingLesson) {
    return <div>Loading...</div>
  } else if (error || errorLesson) {
    return <Navigate to={'/404'} />
  } else {
    return (
      <>
        <NavBarLanding />
        <LessonDescription lesson={lesson} />
        {!quizStart && (
          <StartButton
            setQuizStart={setQuizStart}
            setNumItems={setNumItems}
            lesson={lesson}
          />
        )}
        {quizStart && (
          <DisplayQuestion
            lesson={lesson}
            category_id={category_id}
            taker_id={user.pk}
            numItems={numItems}
          />
        )}
        <Footer />
      </>
    )
  }
}
