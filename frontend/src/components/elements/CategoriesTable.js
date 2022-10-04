import Swal from 'sweetalert2'
import CategoryService from '../../services/category.service'
import Pagination from './Pagination'
import CategoryTableEntry from './CategoryTableEntry'
//part of AdminPage
const CategoriesTable = ({
  lessons,
  count,
  page,
  nextPage,
  previousPage,
  setCount,
  setPage,
  setNextPage,
  setPreviousPage,
}) => {
  const handleAddCategory = (count, setCount) => {
    Swal.fire({
      title: 'Add Category',
      html:
        '<input id="swal-input1" class="swal2-input" type=\'text\' placeholder="Category Name">' +
        '<input id="swal-input2" class="swal2-input" style="height:150px;" placeholder="Category Description">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const category_name = document.getElementById('swal-input1').value
        const category_description = document.getElementById('swal-input2')
          .value
        return { category_name, category_description }
      },
    }).then((result) => {
      if (
        result.isConfirmed &&
        result.value.category_name !== '' &&
        result.value.category_description !== ''
      ) {
        CategoryService.addLesson(result.value).then((response) => {
          if (response.status === 201) {
            Swal.fire('Success!', 'Category added!', 'success')
            setCount(count + 1)
          }
        })
      }
    })
  }

  return (
    <section className="bg-white">
      <div className="container">
        <div className="mw-6xl mx-auto">
          <div
            className="flex flex-col pb-5 px-5 justify-content-end"
            onClick={() => handleAddCategory(count, setCount)}
          >
            <ul className="pagination justify-content-end">
              <li className="btn">Add Category</li>
            </ul>
          </div>
          <div className="table-responsive border rounded shadow">
            <table className="table mb-0">
              <thead className="text-light-dark">
                <tr>
                  <th scope="col">
                    <button className="btn d-flex align-items-center">
                      <small className="me-2 fw-normal">Title</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-center">
                      <small className="me-2 fw-normal">Description</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-center">
                      <small className="me-2 fw-normal">Action</small>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {lessons &&
                  lessons.map((lesson, index) => (
                    <CategoryTableEntry
                      lesson={lesson}
                      key={index}
                      count={count}
                      setCount={setCount}
                      setPage={setPage}
                    />
                  ))}
              </tbody>
            </table>
            <Pagination
              count={count}
              page={page}
              nextPage={nextPage}
              previousPage={previousPage}
              setCount={setCount}
              setPage={setPage}
              setNextPage={setNextPage}
              setPreviousPage={setPreviousPage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoriesTable
