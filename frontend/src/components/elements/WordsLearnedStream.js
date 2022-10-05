import useGetWordsLearned from '../../hooks/useGetWordsLearned'

const WordsLearnedStream = ({ user_profile_taker_id }) => {
  const { isLoading, words, error } = useGetWordsLearned(user_profile_taker_id)
  return (
    <>
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <h3> Words Learned </h3>
              {/* Make a two column layout */}
              <div className="row my-5">
                <div className="col-6 col-lg-6">
                  <span className="fw-bold fs-3"> Words </span>
                </div>
                <div className="col-6 col-lg-6">
                  <span className="fw-bold fs-3"> Answers </span>
                </div>
              </div>
              {!isLoading &&
                !error &&
                words &&
                words.map((word, index) => (
                  <div className="row" key={index}>
                    <div className="col-6 col-lg-6">
                      <span className="fs-3">{word.word_taken}</span>
                    </div>
                    <div className="col-6 col-lg-6">
                      <span className="fs-3"> {word.correct_answer}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default WordsLearnedStream
