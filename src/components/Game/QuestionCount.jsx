import React from 'react';
import { Box, Typography } from '@material-ui/core'

const QuestionCount = (props) => {
  return (
    <Box>
      <Typography variant="h6">
        {`${props.questionCount} / ${props.totalQuestions}`}
      </Typography>
    </Box>
  )
}

export default QuestionCount
