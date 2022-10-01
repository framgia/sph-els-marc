import GridSystem from './GridSystem'
import Item from './Item'

//Part of CategoryResultsPage
const LoadResultData = ({ resultData }) => {
  return (
    <div className="container mt-10 mb-10">
      <div className="row">
        <div className="col-12">
          <h2>Lesson Results</h2>
          <div className="row mb-5">
            <div className="col-8">
              <span> Title: {resultData['category_taken']} </span>
            </div>
            <div className="col-4">
              <span>
                Result: {resultData['score']} / {resultData['total']}
              </span>
            </div>
          </div>

          <GridSystem colCount={1} md={12}>
            <div className="row mb-5">
              <div className="col"> </div>
              <div className="col">
                <h5> Word </h5>
              </div>
              <div className="col">
                <h5> Answer </h5>
              </div>
            </div>
            {resultData['words_learned'].length > 0
              ? resultData['words_learned'].map((item) => (
                  <Item
                    key={item.word_taken}
                    word_taken={item.word_taken}
                    is_correct={item.is_correct}
                    correct_answer={item.correct_answer}
                  />
                ))
              : [<p>No words are found.</p>]}
          </GridSystem>
        </div>
      </div>
    </div>
  )
}

export default LoadResultData
