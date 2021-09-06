import React from 'react'
import { AppBar, Button, IconButton, Toolbar, Typography, makeStyles } from '@material-ui/core'
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
  },
}));


const Navbar = (props) => {
  const classes = useStyles()
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

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
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