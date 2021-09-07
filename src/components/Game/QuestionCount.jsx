import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  typography: {
    color: theme.palette.secondary.main,
    fontWeight: '700'
  }
}))

const QuestionCount = (props) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography variant="h6" className={classes.typography}>
        Round: {`${props.questionCount} / ${props.totalQuestions}`}
      </Typography>
    </Box>
  )
}

export default QuestionCount
