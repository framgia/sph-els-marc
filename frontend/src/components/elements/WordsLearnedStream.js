import { useEffect, useState } from 'react'
import CategoryService from '../../services/category.service'
import Pagination from './Pagination'

const WordsLearnedStream = ({ user_profile_taker_id }) => {
  const [words, setWords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({})
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [nextPage, setNextPage] = useState(null)
  const [previousPage, setPreviousPage] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    CategoryService.getWordsLearned(user_profile_taker_id, page)
      .then((response) => {
        if (response.status === 200) {
          setWords(response.data.results)
          setIsLoading(false)
          setError(false)
          setNextPage(response.data.next)
          setPreviousPage(response.data.previous)
          setCount(response.data.count)
          setTotalPages(response.data.total_pages)
          setPageSize(response.data.page_size)
        }
      })
      .catch((error) => {
        console.error(error)
        setError(error)
        setIsLoading(false)
      })
  }, [user_profile_taker_id, nextPage, previousPage, page])

  return (
    <>
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <h3> Words Learned </h3>
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
              {words.length > 0 && (
                <Pagination
                  count={count}
                  page={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  setCount={setCount}
                  setPage={setPage}
                  setNextPage={setNextPage}
                  setPreviousPage={setPreviousPage}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default WordsLearnedStream
