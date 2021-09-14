import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, makeStyles } from '@material-ui/core'
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

  menu: {
    marginTop: '10px'
  }
}));


const Navbar = (props) => {
  const classes = useStyles()
  const [avatar, setAvatar] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  
  const handleAuthButton = async(e) => {
    setAnchorEl(null)
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

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget)
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleProfileClick = (e) => {
    history.push('/profile')
  }


  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title} onClick={handleLogoClick}>
          Trivia
        </Typography>
      
        {currentUser ?
          
          <>
            
            <IconButton aria-controls="profile-menu" onClick={handleMenuClick}>
              <Avatar src={avatar} />
            </IconButton> 
            
            
            <Menu
              className={classes.menu}
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleAuthButton}>Logout</MenuItem>
            </Menu>
            
            
          </>

        :

          <Button onClick={handleAuthButton}>
            <Typography variant="subtitle2" className={classes.title}>
              login
            </Typography>
          </Button>
          
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar