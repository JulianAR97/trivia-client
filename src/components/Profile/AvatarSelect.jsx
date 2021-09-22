import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, Grid, Paper, makeStyles } from '@material-ui/core'
import { useAuth } from 'contexts/AuthContext'
import { getProfile } from 'actions/Profile'

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '20px'
  },
  avatar: {
    cursor: 'pointer',
    
  },
  large: {
    height: theme.spacing(7),
    width: theme.spacing(7)
  },
  gridContainer: {
    justifyContent: 'center',
  }
}))

const AvatarSelect = (props) => {
  const [currAvatar, setCurrAvatar] = useState('')
  const [nextAvatar, setNextAvatar] = useState(null)
  const classes = useStyles()
  const { currentUser } = useAuth()
  
  useEffect(() => {
    if (currentUser) {
      getProfile(currentUser)
        .then(profile => profile.docs[0].data())
        .then(profile => setCurrAvatar(profile.avatar))
    } else {
      setCurrAvatar('')
    }
  }, [currentUser])

  const renderAvatars = () => {
    return props.avatars.map((a, i) => (
      <Grid key={i} item>
        
        <Card 
          style={{
            backgroundColor: currAvatar === a ? '#00FF00' : nextAvatar === a ? '#0000FF' : '#bbb', padding: '5px'}} 
          raised
        >
          
          <Avatar
            className={`${classes.avatar} ${classes.large}`}
            src={a}
            variant="square"
            onClick={() => setNextAvatar(nextAvatar === a ? null : a)}
          />

        </Card>

      </Grid>
    ))
  }

  
  return (
    <Box className={classes.box}>
      <Grid className={classes.gridContainer} container spacing={10}>
        
        {renderAvatars()}
        

      </Grid>

      
      <Grid className={classes.gridContainer} container spacing={10}>
        <Grid item>
          <Box>

            <Avatar
              className={`${classes.avatar} ${classes.large}`}
              src={currAvatar}
              variant="square"
            />
            
            <Avatar
              className={`${classes.avatar} ${classes.large}`}
              src={nextAvatar}
              variant="square"
            />
          </Box>

          
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="secondary">Confirm Changes</Button>
        </Grid>
      </Grid>

    </Box>
  )
}

AvatarSelect.defaultProps = {
  avatars: [
    '',
    'https://th.bing.com/th/id/OIP.n3gBxX4985e23j7ci4GlAgHaIR?pid=ImgDet&rs=1',
    'https://media.istockphoto.com/photos/yellow-pencil-3d-picture-id590141060?k=6&m=590141060&s=612x612&w=0&h=pB9ZOCmGJqRctGTIvTDCt5xgALHKQi9wZb_yGUc4WqM=',
    'https://i.picsum.photos/id/210/200/200.jpg?hmac=ofnpd0LAPvyH0juHuFCaLU6Y6jqJe4qpuc90jXbzUjY',
    'https://i.picsum.photos/id/63/200/200.jpg?hmac=qWHuiJWhQdWUspXyFKWgfsomzV1IvMNFZQ0hlDl8RZc',
    'https://i.picsum.photos/id/250/200/200.jpg?hmac=23TaEG1txY5qYZ70amm2sUf0GYKo4v7yIbN9ooyqWzs',
    'https://th.bing.com/th/id/OIP.n3gBxX4985e23j7ci4GlAgHaIR?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.n3gBxX4985e23j7ci4GlAgHaIR?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.n3gBxX4985e23j7ci4GlAgHaIR?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.n3gBxX4985e23j7ci4GlAgHaIR?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.n3gBxX4985e23j7ci4GlAgHaIR?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.n3gBxX4985e23j7ci4GlAgHaIR?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.n3gBxX4985e23j7ci4GlAgHaIR?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.n3gBxX4985e23j7ci4GlAgHaIR?pid=ImgDet&rs=1',

  ]
}

export default AvatarSelect
