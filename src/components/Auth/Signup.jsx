import React, { useRef, useState } from 'react';
import { Button, Card, CardContent, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography, makeStyles } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { useAuth } from 'contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Google from 'icons/google'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '400px',
    textAlign: 'center',
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
  }
}))
const Signup = () => {
  // useRef to keep track of form variables
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles()
  const history = useHistory()
  const { signup, googleAuth, setProfile } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // actual input is buried in material-ui Input component, so we need to get lastChild
    if (passwordRef.current.children[0].value !== passwordConfirmRef.children[0].value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.children[0].value, passwordRef.children[0].value)
      await setProfile()
      history.push('/')
    } catch (err){
      console.log(err)
      setError('Failed to create an account')
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
            Sign Up
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
                  <InputAdornment position="end" >
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                } 
                required/>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
              <Input 
                id="password-confirm" 
                type={showPassword ? 'text' : 'password'}
                ref={passwordConfirmRef} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                } 
                required/>
            </FormControl>
            
            <FormControl fullWidth>
              <Button type="submit" disabled={loading}>Sign Up</Button>
            </FormControl>

            <FormControl className={classes.buttonRow} fullWidth>
              <IconButton className={classes.iconButton} onClick={handleGoogle}>
                <Google />
              </IconButton>
            </FormControl>
            
            <Typography variant="subtitle2">
              Have an account? <Link to="login">Login</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
