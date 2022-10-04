import Swal from 'sweetalert2'
import CategoryService from '../../services/category.service'

const CategoryTableEntry = ({ lesson, count, setCount, setPage }) => {
  const handleAddWord = (lesson) => {
    Swal.fire({
      title: 'Add a word',
      width: '800px',
      showCancelButton: true,
      html: `
        <div>
          Under Lesson: ${lesson.category_name}
        </div>  
        <input id="swal-input1" class="swal2-input" placeholder="Word">
        <label for="swal-input1">Word to be added</label><br>
        <input id="swal-input2" class="swal2-input" placeholder="Choice 1">
        <input id="swal-input2-radio" type="radio" name="choices" value="">
        <label for="swal-input2-radio">Correct Answer</label><br>
        <input id="swal-input3" class="swal2-input" placeholder="Choice 2">
        <input id="swal-input3-radio" type="radio" name="choices" value="">
        <label for="swal-input3-radio">Correct Answer</label><br>
        <input id="swal-input4" class="swal2-input" placeholder="Choice 3">
        <input id="swal-input4-radio" type="radio" name="choices" value="">
        <label for="swal-input4-radio">Correct Answer</label><br>
        <input id="swal-input5" class="swal2-input" placeholder="Choice 4">
        <input id="swal-input5-radio" type="radio" name="choices" value="">
        <label for="swal-input5-radio">Correct Answer</label><br>
        `,
      focusConfirm: false,
      preConfirm: () => {
        const word = document.getElementById('swal-input1').value
        const choice1 = document.getElementById('swal-input2').value
        const choice2 = document.getElementById('swal-input3').value
        const choice3 = document.getElementById('swal-input4').value
        const choice4 = document.getElementById('swal-input5').value
        const choice1Radio = document.getElementById('swal-input2-radio')
          .checked
        const choice2Radio = document.getElementById('swal-input3-radio')
          .checked
        const choice3Radio = document.getElementById('swal-input4-radio')
          .checked
        const choice4Radio = document.getElementById('swal-input5-radio')
          .checked
        if (
          !word ||
          !choice1 ||
          !choice2 ||
          !choice3 ||
          !choice4 ||
          (!choice1Radio && !choice2Radio && !choice3Radio && !choice4Radio)
        ) {
          Swal.showValidationMessage(`Please fill out all fields`)
        }
        return {
          word: word,
          choice1: choice1,
          choice2: choice2,
          choice3: choice3,
          choice4: choice4,
          choice1Radio: choice1Radio,
          choice2Radio: choice2Radio,
          choice3Radio: choice3Radio,
          choice4Radio: choice4Radio,
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const word = result.value.word
        const choice1 = result.value.choice1
        const choice2 = result.value.choice2
        const choice3 = result.value.choice3
        const choice4 = result.value.choice4
        const choice1Radio = result.value.choice1Radio
        const choice2Radio = result.value.choice2Radio
        const choice3Radio = result.value.choice3Radio
        const choice4Radio = result.value.choice4Radio
        const correctChoice = choice1Radio
          ? choice1
          : choice2Radio
          ? choice2
          : choice3Radio
          ? choice3
          : choice4Radio
          ? choice4
          : null
        const choices = [choice1, choice2, choice3, choice4]
        const data = {
          word_text: word,
          category: {
            category_name: lesson.category_name,
          },
          choices: [],
          answer: {
            answer_text: correctChoice,
          },
        }
        for (let i = 0; i < choices.length; i++) {
          data['choices'].push({
            choice_text: choices[i],
          })
        }
        CategoryService.addWord(data)
          .then(() => {
            Swal.fire({
              title: 'Success!',
              text: 'Word added!',
              icon: 'success',
              confirmButtonText: 'OK',
            })
            setPage(1)
          })
          .catch(() => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong. Please try again!',
              icon: 'error',
              confirmButtonText: 'OK',
            })
          })
      }
    })
  }

  const handleEditCategory = (lesson) => {
    Swal.fire({
      title: 'Edit Category',
      html: `
        <input id="swal-input1" class="swal2-input" value="${lesson.category_name}">
        <input id="swal-input2" class="swal2-input" style="height:150px;" value="${lesson.category_description}">
        `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById('swal-input1').value
        const description = document.getElementById('swal-input2').value
        if (!name || !description) {
          Swal.showValidationMessage(`Please enter a name and description`)
        }
        return { name, description }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        CategoryService.updateCategory(
          lesson.id,
          result.value.name,
          result.value.description,
        )
        Swal.fire({
          title: 'Category Updated!',
          icon: 'success',
        })
        setPage(1)
      }
    })
  }

  const handleDeleteCategory = (id, count, setCount) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        CategoryService.deleteCategory(id)
          .then((response) => {
            if (response.status === 204) {
              Swal.fire(
                'Deleted!',
                'Your category has been deleted.',
                'success',
              )
              setCount(count - 1)
            }
          })
          .catch(() => {
            Swal.fire('Error!', 'Something went wrong.', 'error')
          })
      }
    })
  }

  return (
    <tr>
      <th className="p-6 px-10" scope="row">
        <small className="fw-normal"> {lesson.category_name}</small>
      </th>
      <td className="p-6 px-10">
        <small className="fw-normal">{lesson.category_description}</small>
      </td>
      <td className="p-6 px-10">
        <ul className="pagination justify-content-center">
          <li className="btn" onClick={() => handleAddWord(lesson)}>
            Add Word
          </li>
          <li
            className="btn"
            onClick={() => handleEditCategory(lesson, setPage)}
          >
            Edit
          </li>
          <li
            className="btn"
            onClick={() => handleDeleteCategory(lesson.id, count, setCount)}
          >
            Delete
          </li>
        </ul>
      </td>
    </tr>
  )
}

export default CategoryTableEntry
