import React, { useEffect } from 'react'
import { Card, Container, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import Game from 'components/Game/Game'
import Stats from 'components/Stats/Stats'
import { useAuth } from 'contexts/AuthContext'
import { setProfile } from 'actions/Profile'

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: '20px',
  }
}))

const Home = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) 
      setProfile(currentUser)
  
  }, [currentUser])


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
        <Stats />
      </Card>     
      {/*Choose cat*/}
      <Card 
        className={classes.card} 
        style={calcCardStyle()}
        raised
      >
        <Game />
      </Card>
      
    </Container>
  )
}

export default Home