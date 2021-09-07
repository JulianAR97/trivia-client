import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { useAuth } from 'contexts/AuthContext'

const useStyles = makeStyles(theme => ({
  grid: {
    textAlign: 'center',
  }
}))

const Stats = (props) => {
  const classes = useStyles()
  const { currentUser } = useAuth()
  
  return (
    <Grid item xs={12} className={classes.grid}>
      {
        !currentUser ? 
          <Typography variant="h6">
            Please sign in to view statistics
          </Typography>
        :
        <>
        </>
      }
    </Grid>
  )
}

export default Stats