import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.secondary.main,
    textAlign: 'center',
    cursor: 'pointer',
    padding: '10px',
    
  },

  typography: {
    color: theme.palette.secondary.contrastText
  }
  
}))

const Answer = (props) => {
  const classes = useStyles()
  return (
    <Grid 
      item 
      xs={12} 
      md={6}
    >
      <Paper className={classes.paper} onClick={() => props.handleClick(props.answer)}>
        <Typography variant="h6" p={2} className={classes.typography}>
          {props.answer}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Answer