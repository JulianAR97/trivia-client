import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, IconButton, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { getProfile } from 'actions/Profile'
import { Menu as MenuIcon} from '@material-ui/icons'
import { useAuth } from 'contexts/AuthContext'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    color: '#fff'
  },
}));


const Navbar = (props) => {
  const classes = useStyles()
  const [avatar, setAvatar] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  
  const handleAuthButton = async(e) => {
    if (currentUser) {
      await logout()
      history.push('/')
    } else {
      history.push('/login')
    }
  }

  useEffect(() => {
    if (currentUser) {
      getProfile(currentUser)
        .then(profile => profile.docs[0].data())
        .then(profile => setAvatar(profile.avatar))
    } else {
      setAvatar('')
    }

  }, [currentUser] )

  const handleLogoClick = (e) => {
    if (history.location.pathname === '/') {
      window.location.reload()
    } else {
      history.push('/')
    }
  }

  useEffect(() => {

  })


  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title} onClick={handleLogoClick}>
          Trivia
        </Typography>
      
        {currentUser ? <Avatar src={avatar} /> : null }
      
        <Button onClick={handleAuthButton}>
          <Typography variant="subtitle2" className={classes.title}>
            {currentUser ? 'logout' : 'login'}
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar