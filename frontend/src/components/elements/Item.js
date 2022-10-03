const Item = (props) => {
  const { word_taken, is_correct, correct_answer } = props

  return (
    <>
      <div className="row  mb-10">
        <div className="col display-5"> {is_correct ? '✅' : '❌'} </div>
        <div className="col display-5"> {word_taken} </div>
        <div className="col display-5"> {correct_answer} </div>
      </div>
    </>
  )
}

export default Item
