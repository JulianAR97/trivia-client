import React, { useState } from 'react'
import { Tab, Tabs, useMediaQuery, useTheme } from '@material-ui/core'

const ProfileNav = (props) => {
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const handleTabSelect = (e, newValue) => {
    setTabValue(newValue)
  }

  return (
    
      <Tabs
        value={tabValue}
        onChange={handleTabSelect}
        indicatorColor="primary"
        textColor="primary"
        variant={isSmall ? 'fullWidth' : 'standard'}
        centered
      >
        <Tab label="Avatar" />
        <Tab label="Settings" />
        <Tab label="Item Three" />
      </Tabs>
    
  )
}



export default ProfileNav
