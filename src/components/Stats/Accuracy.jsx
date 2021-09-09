import React from 'react';
import { Box, Grid, Typography, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
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


const Accuracy = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  
  const {
    easyCorrect, 
    easyCount, 
    mediumCorrect, 
    mediumCount,
    hardCorrect, 
    hardCount, 
    totalQuestionCorrect, 
    totalQuestionCount, 
  } = props.stats
  
  const renderDifficulty = (correct, count, label) => {
    return (
      <Grid item className={classes.gridItem}>
        { /* value must be passed as number between 0 and 100, we pass 5 in if there are 0 correct answers so that progress indicator still shows */ } 
        <CircularProgressWithLabel 
          value={Math.max(Math.round(correct / count * 100), 5)}
          textValue={`${correct} / ${count}`} 
          color="secondary" 
        />
        <Typography className={classes.typography} variant="h6">
          {label}
        </Typography>
      </Grid>
    )
  }
  
  return (
    <>
      
      {/* Accuracy per difficulty (fraction) */}
      <Box >
        <Grid container className={classes.gridContainer} spacing={isSmall ? 3 : 10}>
          {renderDifficulty(easyCorrect, easyCount, 'easy')}
          {renderDifficulty(mediumCorrect, mediumCount, 'medium')}
          {renderDifficulty(hardCorrect, hardCount, 'hard')}
          
          <Grid item className={classes.gridItem}>
            <CircularProgressWithLabel 
              value={Math.round((totalQuestionCorrect / totalQuestionCount) * 100)}
              textValue={`${(totalQuestionCorrect / totalQuestionCount) * 100}%`} 
              color="secondary" 
            />
            <Typography className={classes.typography} variant="h6">
              accuracy
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </>
  )
}

export default Accuracy