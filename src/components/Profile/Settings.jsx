import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: '20px'
  }
}))

const Settings = () => {
  const classes = useStyles()
  
  return (
    <Box className={classes.box}>
      Settings
    </Box>
  )
}

export default Settings
