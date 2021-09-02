import React from 'react';
import { Box, Typography } from '@material-ui/core'

const Score = (props) => {
  return (
    <Box>
      <Typography variant="h6">
        {props.score}
      </Typography>
    </Box>
  )
}

export default Score