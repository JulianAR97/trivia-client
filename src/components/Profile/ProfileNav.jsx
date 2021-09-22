import React, { useState } from 'react'
import { Box, Tab, Tabs, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import AvatarSelect from 'components/Profile/AvatarSelect'
import Settings from 'components/Profile/Settings'

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: '20px'
  }
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const classes = useStyles()

  return (
    <Box
      role="tabpanel"
      className={classes.box}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Box>
  );
}



const ProfileNav = (props) => {
  
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  
  const handleTabSelect = (e, newValue) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Box>
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
        </Tabs>

      </Box>

      <TabPanel value={tabValue} index={0}>
        <AvatarSelect />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Settings />
      </TabPanel>

    </>
    
  )
}



export default ProfileNav
