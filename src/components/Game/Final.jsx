import React from 'react';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import CircularProgressWithLabel from 'components/Misc/CircularProgressWithLabel'

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'center'
  },
  gridContainer: {
    justifyContent: 'center'
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  typography: {
    color: theme.palette.primary.light
  }

}))

const Final = (props) => {
  const classes = useStyles()
  
  const renderDifficulies = () => {
    return Object.keys(props.difficultyCount).map((k, i) => (
      <Grid item className={classes.gridItem}>
        <CircularProgressWithLabel key={i} value={`${props.difficultyCount[k].correct} / ${props.difficultyCount[k].seen}`} color="secondary" />
        <Typography className={classes.typography} variant="h6">
          {k}
        </Typography>
      </Grid>
    ))
  }
  
  
  return (
    <>
      <Box className={classes.box}>
        <Grid container className={classes.gridContainer}>
          <Grid item>
            <CircularProgressWithLabel 
              value={`${(props.score / props.questionCount) * 100}%`} 
              color="secondary" 
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.box}>
        <Grid container className={classes.gridContainer} spacing={10}>
          {renderDifficulies()}
        </Grid>
      </Box>
    </>
  )
}

export default Final