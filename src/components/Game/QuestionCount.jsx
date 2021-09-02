import React from 'react';

const QuestionCount = (props) => {
  return (
    <div>
      {`${props.questionCount} / ${props.totalQuestions}`}
    </div>
  )
}

export default QuestionCount
