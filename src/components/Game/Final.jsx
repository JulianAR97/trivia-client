import React from 'react';
import { Box, Grid, IconButton, Tooltip, Typography, makeStyles } from '@material-ui/core'
import { Replay } from '@material-ui/icons'
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
    color: theme.palette.primary.light,
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
      {/* Overall accuracy (percentage) */}
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
      
      {/* Accuracy per difficulty (fraction) */}
      <Box className={classes.box}>
        <Grid container className={classes.gridContainer} spacing={10}>
          {renderDifficulies()}
        </Grid>
      </Box>

      {/* Controls */}
      <Box className={classes.box}>
        <Grid container className={classes.gridContainer} spacing={10}>
          <Grid item>
            <Tooltip title="replay" arrow>
              <IconButton>
                <Replay color="secondary" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Final