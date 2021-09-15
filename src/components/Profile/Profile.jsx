import React from 'react';
import { Box, Card, Container, Grid, Typography, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import ProfileNav from 'components/Profile/ProfileNav.jsx'


const useStyles = makeStyles((theme) => ({
  grid: {
    textAlign: 'center'
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
  },
  
  container: {
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  card: {
    marginTop: '20px',
    textAlign: 'center',
  },
}))

const Profile = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  

  const calcCardStyle = () => {
    return {
      padding: isSmall ? '30px 10px' : '30px'
    }
  }
  

  return (
    
    <Container className={classes.container}>
      <Card
        className={classes.card}
        style={calcCardStyle()}
        raised
      >
        <Grid item xs={12} className={classes.grid}>
          <Box>
            <Grid container className={classes.gridContainer} spacing={10}>
              <Grid item className={classes.gridItem}>
                <Typography className={classes.typography} variant="h5">
                  Profile
                </Typography>
              </Grid>
            </Grid>
          </Box>
        
        </Grid>
        
        <ProfileNav />
        
      </Card>
    </Container>

  )
}



export default Profile 