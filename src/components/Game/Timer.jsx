import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core' 
import CircularProgressWithLabel from 'components/Misc/CircularProgressWithLabel'
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp }) => {
  const theme = useTheme()
  
  const {
    seconds,
    restart
  } = useTimer({expiryTimestamp})
  
  
  useEffect(() => {
    restart(expiryTimestamp)
  }, [expiryTimestamp])

  console.log(theme.palette.secondary.main)
  return (
    <CircularProgressWithLabel 
      color={ seconds > 10 ? 'primary' : 'secondary' }
      value={seconds * 3.34} 
      label={seconds} 
    />
    
  )
}


export default Timer