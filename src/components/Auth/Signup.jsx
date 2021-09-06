import React, { useRef, useState } from 'react';
import { Button, Card, CardContent, FormControl, Input, InputLabel, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useAuth } from 'contexts/AuthContext'
import { useHistory } from 'react-router-dom'

const Signup = () => {
  // useRef to keep track of form variables
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // actual input is buried in material-ui Input component, so we need to get lastChild
    if (passwordRef.current.lastChild.value !== passwordConfirmRef.current.lastChild.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.lastChild.value, passwordRef.current.lastChild.value)
      history.push('/')
    } catch (err){
      console.log(err)
      setError('Failed to create an account')
    }

    setLoading(false)
    
  }

  return (
    <>
      <Card>
   
        <CardContent>

          <Typography variant="h6">
            Sign Up
          </Typography>
         
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" ref={emailRef} required/>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" type="password" ref={passwordRef} required/>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
              <Input id="password-confirm" type="password" ref={passwordConfirmRef} required/>
            </FormControl>

            <Button type="submit" disabled={loading}>Sign Up</Button>
            
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default Signup;
