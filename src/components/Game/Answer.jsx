import React from 'react';

const Answer = (props) => {
  return (
    <div onClick={() => props.handleClick(props.answer)}>
      {props.answer}
    </div>
  )
}

export default Answer