import React, { useEffect } from 'react';
import CircularProgressWithLabel from 'components/Misc/CircularProgressWithLabel'
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp }) => {
  const {
    seconds,
    restart
  } = useTimer({expiryTimestamp})
  
  
  useEffect(() => {
    restart(expiryTimestamp)
  })

  return (
    <CircularProgressWithLabel value={seconds * 3.34} label={seconds} />
    
  )
}


export default Timer