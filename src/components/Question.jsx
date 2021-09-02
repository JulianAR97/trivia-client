import React from 'react';

const Question = (props) => {
  console.log('here')
  console.log(props)
  return (
    <div>
      {props.question}
    </div>
  )
}

export default Question