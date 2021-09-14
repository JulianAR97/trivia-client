import React, {useEffect, useState} from 'react';
import Accuracy from 'components/Stats/Accuracy'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { useAuth } from 'contexts/AuthContext'
import { database } from 'firebase.js'

const useStyles = makeStyles(theme => ({
  grid: {
    textAlign: 'center',
  },
  gridContainer: {
    justifyContent: 'center',
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

const Stats = (props) => {
  const classes = useStyles()
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({})
  const [errors, setErrors] = useState([])
  
  const getStats = async (uid) => {
    let userStats = await database.stats.where('userId', '==', uid).get()
    if (userStats.docs[0]) {
      const {userId, ...restData} = userStats.docs[0].data()
      setStats({...restData})
    } else {
      setErrors(prevErrors => [...prevErrors, 'No stats to display'])
    }
  }

  useEffect(() => {
    setErrors([])
    setLoading(true)

    if (currentUser?.uid)
      getStats(currentUser.uid)
    else 
      setErrors(prevErrors => [...prevErrors, 'Please login to view stats'])
    
    
    setLoading(false)
  
  }, [currentUser])

  const renderErrors = (errors) => {
    return errors.map((e, i) => (
      <Typography key={i} variant="h6">{e}</Typography>
    ))
  }

  return (
    <Grid item xs={12} className={classes.grid}>
      {
      loading ? 
        <Typography variant="h6">Loading...</Typography>
      :
      errors[0] ?
        renderErrors(errors) 
      :
        <>
          <Box>
            <Grid container className={classes.gridContainer} spacing={10}>
              <Grid item className={classes.gridItem}>
                <Typography className={classes.typography} variant="h5">
                  Stats
                </Typography>
              </Grid>
            </Grid>
          </Box>
        
          <Accuracy stats={stats} />
        </>
        
      }
    </Grid>
  )
}

export default Stats