import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  typography: {
    color: theme.palette.secondary.main,
    fontWeight: '700'
  }
}))

const Score = (props) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography variant="h6" className={classes.typography}>
        Score: {props.score}
      </Typography>
    </Box>
  )
}

export default Score