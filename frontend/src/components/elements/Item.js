const Item = (props) => {
  const { id, word_taken, is_correct, correct_answer } = props

  return (
    <div className="row" key={id}>
      <div className="col"> {is_correct ? '✅' : '❌'} </div>
      <div className="col"> {word_taken} </div>
      <div className="col"> {correct_answer} </div>
    </div>
  )
}

export default Item
