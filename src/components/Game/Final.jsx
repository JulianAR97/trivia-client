import React, { useEffect } from 'react';
import { Box, Grid, IconButton, Tooltip, Typography, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { Replay } from '@material-ui/icons'
import CircularProgressWithLabel from 'components/Misc/CircularProgressWithLabel'
import { database } from 'firebase.js'
import { useAuth } from 'contexts/AuthContext'

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

// get stats,
// find or update stats

const Final = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const { currentUser } = useAuth()

  const createOrUpdateDoc = async () => {
    const res = await database.stats.get({uid: currentUser.uid})
    
    if (res.docs[0]?.exists) {
      // update doc
      let docData = res.docs[0].data()

      const result = await database.stats
        .doc(res.docs[0].id)
        .update({
          totalQuestionCorrect: docData.totalQuestionCorrect + props.score,
          totalQuestionCount: docData.totalQuestionCount + props.questionCount,
          easyCorrect: docData.easyCorrect + props.difficultyCount['easy'].correct,
          easyCount: docData.easyCount + props.difficultyCount['easy'].seen,
          mediumCorrect: docData.mediumCorrect + props.difficultyCount['medium'].correct,
          mediumCount: docData.mediumCount + props.difficultyCount['medium'].seen,
          hardCorrect: docData.hardCorrect + props.difficultyCount['hard'].correct,
          hardCount: docData.hardCount + props.difficultyCount['hard'].seen
        })

      return result
    } else {
      // create doc
      console.log('here')
      const result = await database.stats.add({
        userId: currentUser.uid,
        totalQuestionCorrect: props.score,
        totalQuestionCount: props.questionCount,
        easyCorrect: props.difficultyCount.easy.correct,
        easyCount: props.difficultyCount.easy.seen,
        mediumCorrect: props.difficultyCount['medium'].correct,
        mediumCount: props.difficultyCount['medium'].seen,
        hardCorrect: props.difficultyCount['hard'].correct,
        hardCount: props.difficultyCount['hard'].seen
      })
      return result
    }
  }
  console.log(props.difficultyCount)
  
  // OnMount, we want to update the stats
  useEffect(() => {
    // database.stats.add({
    //   userId: currentUser.uid,
    //   score: props.score,
    //   questionCount: props.questionCount,
    // })
    
    
    createOrUpdateDoc()
    
   
      
    
  })
  
  const renderDifficulties = () => {
    return Object.keys(props.difficultyCount).map((k, i) => (
      <Grid item key={i} className={classes.gridItem}>
        { /* value must be passed as number between 0 and 100, we pass 5 in if there are 0 correct answers so that progress indicator still shows */ } 
        <CircularProgressWithLabel 
          value={Math.max(Math.round(props.difficultyCount[k].correct / props.difficultyCount[k].seen * 100), 5)}
          label={`${props.difficultyCount[k].correct} / ${props.difficultyCount[k].seen}`}
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
              label={`${props.score} / ${props.questionCount}`} 
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