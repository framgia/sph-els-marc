const Pagination = ({
  count,
  page,
  totalPages,
  pageSize,
  nextPage,
  previousPage,
  setCount,
  setPage,
  setNextPage,
  setPreviousPage,
}) => {
  const handlePageChange = (page) => {
    setPage(page)
  }

  const handlePreviousPage = () => {
    if (previousPage) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (nextPage) {
      setPage(page + 1)
    }
  }

  return (
    <nav aria-label="Page navigation example" className="py-2">
      <ul className="pagination justify-content-end">
        {!previousPage && (
          <li className="page-item disabled">
            <button
              className="page-link"
              tabIndex={-1}
              onClick={handlePreviousPage}
              aria-disabled="true"
            >
              Previous
            </button>
          </li>
        )}
        {previousPage && (
          <li className="page-item">
            <button
              className="page-link"
              tabIndex={-1}
              onClick={handlePreviousPage}
              aria-disabled="true"
            >
              Previous
            </button>
          </li>
        )}

        {Array.from(Array(totalPages).keys()).map((pageNumber) => {
          return (
            <li
              className={`page-item ${pageNumber + 1 === page ? 'active' : ''}`}
              key={pageNumber}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            </li>
          )
        })}
        {nextPage && (
          <li className="page-item">
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        )}
        {!nextPage && (
          <li className="page-item disabled">
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
