import { useParams, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LessonDescription from '../../components/elements/LessonDescription'
import DisplayQuestion from '../../components/elements/DisplayQuestion'
import StartButton from '../../components/elements/StartButton'
import Footer from '../../components/Footer'
import NavBarLanding from '../../components/elements/NavBarLanding'
import useLessonExists from '../../hooks/useLessonExists'
import useGetLesson from '../../hooks/useGetLesson'
import { ReactComponent as LessonFigure } from './lessons.svg'

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

  if (isLoading || isLoadingLesson) {
    return <div>Loading...</div>
  } else if (error || errorLesson) {
    return <Navigate to={'/404'} />
  } else {
    return (
      <>
        <NavBarLanding />
        {!quizStart && (
          <section className="mx-auto d-flex justify-content-center mb-5">
            <LessonFigure />
          </section>
        )}
        {exists && (
          <section className="mx-auto d-flex justify-content-center mb-5">
            <Link to={`/category/results/${category_id}/`}>
              <button className="btn btn-outline-dark" type="button">
                {' '}
                See Results of {lesson.category_name}
              </button>
            </Link>
          </section>
        )}
        {lesson.num_items === 0 && (
          <section className="mx-auto d-flex justify-content-center mb-5">
            This lesson ({lesson.category_name}) is not yet finalized (No words
            to learn yet).
          </section>
        )}
        {!quizStart && !exists && lesson.num_items > 0 && (
          <>
            <StartButton
              setQuizStart={setQuizStart}
              setNumItems={setNumItems}
              lesson={lesson}
            />
          </>
        )}
        {quizStart && (
          <>
            <LessonDescription lesson={lesson} />

            <DisplayQuestion
              lesson={lesson}
              category_id={category_id}
              taker_id={user.pk}
              numItems={numItems}
            />
          </>
        )}
        <Footer />
      </>
    )
  }
}
