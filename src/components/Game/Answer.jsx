import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: '#92DFF3',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '10px',
    
  },
  
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
        <Typography variant="h6" p={2}>
          {props.answer}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Answer