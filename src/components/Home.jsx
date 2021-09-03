import React from 'react'
import { Container, Grid, useMediaQuery, useTheme } from '@material-ui/core'
import Game from 'components/Game/Game'
import Stats from 'components/Stats/Stats'

const Home = (props) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  
  return (
    <Container>
      <Grid container spacing={isSmall ?  2 : 4}>
        <Stats />
        {/*Choose cat*/}
        <Game />
      </Grid>
    </Container>
  )
}

export default Home