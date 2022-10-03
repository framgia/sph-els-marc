//part of CategoryPage
const StartButton = ({ setQuizStart, setNumItems, lesson }) => {
  return (
    <section className="mb-10 d-grid gap-2 col-6 mx-auto">
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          setQuizStart(true)
          setNumItems(lesson['num_items'])
        }}
      >
        Start Lesson
      </button>
    </section>
  )
}

export default StartButton
