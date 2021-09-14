import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.secondary.main,
    textAlign: 'center',
    cursor: 'pointer',
    padding: '10px',
    '&:hover': {
      // 7px 7px defines thickness of shadow, 5px defines blur
      boxShadow: `7px 7px 5px ${theme.palette.grey[400]}`,
      transition: 'box-shadow 0.5s ease'
    }
    
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
      className={classes.gridItem} 
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