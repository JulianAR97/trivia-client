import React, { useRef, useState } from 'react';
import { Button, Card, CardContent, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography, makeStyles } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { useAuth } from 'contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Google from 'icons/google'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '400px'
  },
  container: {
    display: 'flex',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    display: 'inline-flex'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  
}))

const Login = () => {
  // useRef to keep track of form variables
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles()
  const history = useHistory()
  const { login, googleAuth } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
     
      await login(emailRef.current.children[0].value, passwordRef.current.children[0].value)
      history.push('/')
    } catch (err){
      console.log(err)
      setError('Failed to sign in')
    }

    setLoading(false)
    
  }

  const handleGoogle = async (e) => {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)

      await googleAuth()
      
      history.push('/')
    } catch (err) {
      console.log(err)
      setError('Failed to sign in with Google')
    }
  }


  return (
    <div className={classes.container}>
      <Card className={classes.card}>
   
        <CardContent>

          <Typography variant="h6">
            Login
          </Typography>
         
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" ref={emailRef} required/>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
                id="password" 
                type={showPassword ? 'text' : 'password'}
                ref={passwordRef}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                } 
                required
              />
            </FormControl>
            <FormControl fullWidth>

              <Button type="submit" disabled={loading}>Login</Button>
            </FormControl>
            
            <FormControl className={classes.buttonRow} fullWidth>
              <IconButton className={classes.iconButton} onClick={handleGoogle}>
                <Google />
              </IconButton>
            </FormControl>
            
            <Typography variant="subtitle2">
              Need an account? <Link to="/signup">Sign up</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;