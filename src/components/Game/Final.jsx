import React from 'react';
import { Box, Grid, IconButton, Tooltip, Typography, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
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
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))

  const renderDifficulties = () => {
    return Object.keys(props.difficultyCount).map((k, i) => (
      <Grid item className={classes.gridItem}>
        { /* value must be passed as number between 0 and 100, we pass 5 in if there are 0 correct answers so that progress indicator still shows */ } 
        <CircularProgressWithLabel 
          key={i}
          value={Math.max(Math.round(props.difficultyCount[k].correct / props.difficultyCount[k].seen * 100), 5)}
          textValue={`${props.difficultyCount[k].correct} / ${props.difficultyCount[k].seen}`} 
          color="secondary" 
        />
        <Typography className={classes.typography} variant="h6">
          {k}
        </Typography>
      </Grid>
    ))
  }
  
  const handleReplay = () => {
    window.location.reload()
  }
  
  return (
    <>
      <Box>
        <Grid container className={classes.gridContainer} spacing={10}>
          <Grid item className={classes.gridItem}>
            <Typography className={classes.typography} variant="h5">
              Score
            </Typography>
          </Grid>
        </Grid>
      </Box>
      
      {/* Accuracy per difficulty (fraction) */}
      <Box >
        <Grid container className={classes.gridContainer} spacing={isSmall ? 3 : 10}>
          {renderDifficulties()}
          <Grid item className={classes.gridItem}>
            <CircularProgressWithLabel 
              value={Math.round((props.score / props.questionCount) * 100)}
              textValue={`${(props.score / props.questionCount) * 100}%`} 
              color="secondary" 
            />
            <Typography className={classes.typography} variant="h6">
              accuracy
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Controls */}
      <Box>
        <Grid container className={classes.gridContainer} spacing={10}>
          <Grid item className={classes.gridItem}>
            <Tooltip title="replay" arrow>
              <IconButton onClick={handleReplay}>
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