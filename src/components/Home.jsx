import React from 'react'
import { Container, Grid } from '@material-ui/core'
import Game from 'components/Game/Game'
import Stats from 'components/Stats/Stats'

const Home = (props) => {
  return (
    <Container>
      <Grid container>
        <Stats />
        {/*Choose cat*/}
        <Game />
      </Grid>
    </Container>
  )
}

export default Home