import React from 'react'
import { Card, Container, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import Game from 'components/Game/Game'
import Stats from 'components/Stats/Stats'

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

  return (
    <Container className={classes.container}>      
      <Stats />
      {/*Choose cat*/}
      <Card className={classes.card} style={{padding: isSmall ? '30px 10px' : '30px'}}>
        <Game />
      </Card>
      
    </Container>
  )
}

export default Home