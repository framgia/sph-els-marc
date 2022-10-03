//Part of CategoryPage
const LessonDescription = ({ lesson }) => {
  return (
    <section className="py-6 mx-20">
      <div className="container">
        <h1>{lesson.category_name}</h1>
        <p className="text-decoration-none">{lesson.category_description}</p>
      </div>
    </section>
  )
}

export default LessonDescription
