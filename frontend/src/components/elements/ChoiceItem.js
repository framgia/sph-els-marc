//part of CategoryPage
const ChoiceItem = ({ choice, index, currentChoice, setCurrentChoice }) => {
  const handleChange = (event) => {
    setCurrentChoice(event.target.value)
  }
  return (
    <>
      <label
        style={{ display: 'block' }}
        className={
          'col-12 col-md-6 mb-12 ' +
          (currentChoice === choice['choice_text'] ? 'bg-primary-dark' : '')
        }
      >
        <input
          style={{ visibility: 'hidden', position: 'absolute' }}
          type="radio"
          name="choice"
          value={choice['choice_text']}
          checked={currentChoice === choice['choice_text']}
          onChange={handleChange}
        />

        <p
          className={
            'mb-0 ' +
            (currentChoice === choice['choice_text']
              ? 'text-light'
              : 'text-muted')
          }
        >
          Choice {index + 1}
        </p>
        <span
          className={
            'text-decoration-none ' +
            (currentChoice === choice['choice_text']
              ? 'text-light'
              : 'text-dark')
          }
        >
          {choice['choice_text']}
        </span>
      </label>
    </>
  )
}

export default ChoiceItem
