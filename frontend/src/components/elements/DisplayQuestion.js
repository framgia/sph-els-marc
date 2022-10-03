import ChoiceItem from './ChoiceItem'
import CategoryService from '../../services/category.service'
import { useState } from 'react'
import Swal from 'sweetalert2'
//part of CategoryPage
const DisplayQuestion = ({ lesson, category_id, taker_id, numItems }) => {
  const [lessonAnswering, setLessonAnswering] = useState({
    category_id: +category_id,
    questions: [],
  })
  const [currItem, setCurrentItem] = useState(0)
  const [currentChoice, setCurrentChoice] = useState(
    lesson['words'][currItem]['choices'][0]['choice_text'],
  )
  const [readySubmit, setReadySubmit] = useState(false)

  const handleNext = () => {
    const question = {
      word: lesson['words'][currItem]['word_text'],
      choices: lesson['words'][currItem]['choices'],
      selected_answer: currentChoice,
    }
    setLessonAnswering({
      ...lessonAnswering,
      questions: [...lessonAnswering['questions'], question],
    })
    if (currItem + 1 === numItems) {
      Swal.fire(
        'Quiz Completed!',
        'Please click submit to submit your answers.',
      ).then(() => {
        setReadySubmit(true)
      })
    } else {
      setCurrentItem(currItem + 1)
      setCurrentChoice(
        lesson['words'][currItem + 1]['choices'][0]['choice_text'],
      )
    }
  }

  const handlePrevious = () => {
    const questions = lessonAnswering['questions']
    questions.pop()
    setLessonAnswering({
      ...lessonAnswering,
      questions: questions,
    })
    if (currItem === numItems - 1) {
      setReadySubmit(false)
    }
    if (currItem - 1 === -1) {
      setReadySubmit(false)
    } else {
      setCurrentItem(currItem - 1)
      setCurrentChoice(
        lesson['words'][currItem - 1]['choices'][0]['choice_text'],
      )
    }
  }

  const handleSubmit = () => {
    CategoryService.submitLessonAnswer(taker_id, lessonAnswering)
      .then(() => {
        Swal.fire(
          'Quiz Submitted!',
          'You will be redirected to the results page.',
        ).then(() => {
          window.location.href = `/category/results/${category_id}/`
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <section className="position-relative pb-24 bg-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-12 mb-md-0">
            <div className="mw-md">
              <h3 id="quiz-current-item" className="mb-6 font-heading">
                Question {currItem + 1} of {numItems}
              </h3>
              <h2
                id="quiz-current-item-text"
                className="display-6 lh-sm font-heading"
              >
                {lesson['words'][currItem]['word_text']}
              </h2>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              {lesson['words'][currItem]['choices'].map((choice, index) => (
                <ChoiceItem
                  choice={choice}
                  index={index}
                  key={index}
                  currentChoice={currentChoice}
                  setCurrentChoice={setCurrentChoice}
                />
              ))}
            </div>
            <div className="row">
              <div className="col-md-6 btn-group">
                <button
                  className={
                    'btn rounded-pill btn-primary-dark ' +
                    (currItem !== 0 ? '' : 'invisible')
                  }
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              </div>
              {!readySubmit && (
                <div className="col-md-6 btn-group">
                  <button
                    className="btn rounded-pill btn-primary-dark"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              )}
              {readySubmit && (
                <div className="col-md-6 btn-group">
                  <button
                    className="btn rounded-pill btn-primary-dark"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DisplayQuestion
