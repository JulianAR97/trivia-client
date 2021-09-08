import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  box: {
    textAlign: 'center',
    margin: '30px 0px'
  },
  typography: {
    color: theme.palette.primary.light
  }
}))

const Question = (props) => {
  const classes = useStyles()
  return (
    <Box className={classes.box}>
      <Typography variant="h5" color="primary" className={classes.typography}>
        {props.question}
      </Typography>
    </Box>
  )
}

export default Question