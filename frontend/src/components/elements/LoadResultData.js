import GridSystem from './GridSystem'
import Item from './Item'
//Part of CategoryResultsPage
const LoadResultData = ({ resultData }) => {
  return (
    <div className="container mt-10 mb-10">
      <div className="row">
        <div className="col-12">
          <h1>Lesson Results</h1>
          <div className="row mb-5">
            <div className="col-lg-8 col-md-8 col-8">
              <span className="font-heading display-5">
                Title: {resultData['category_taken']}
              </span>
            </div>
            <div className="col-lg-4 col-md-4 col-4">
              <span className="display-5">
                Result: {resultData['score']} / {resultData['total']}
              </span>
            </div>
          </div>

          <GridSystem colCount={1} md={12}>
            <div className="row mb-5">
              <div className="col"> </div>
              <div className="col display-5">Word</div>
              <div className="col display-5">Answer</div>
            </div>
            {resultData['words_learned'].length > 0
              ? resultData['words_learned'].map((item, index) => (
                  <Item
                    key={index}
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
