import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core'

const CircularProgressWithLabel = (props) => {
  const {value, ...rest} = props
  
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={value} {...rest} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color={props.color}>
          {props.label}
        </Typography>
      </Box>
    </Box>
  )
}

export default CircularProgressWithLabel
