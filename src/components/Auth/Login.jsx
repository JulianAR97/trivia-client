import React, { useRef, useState } from 'react';
import { Button, Card, CardContent, FormControl, Input, InputLabel, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

const Login = () => {
  // useRef to keep track of form variables
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.lastChild.value, passwordRef.current.lastChild.value)
      history.push('/')
    } catch (err){
      console.log(err)
      setError('Failed to sign in')
    }

    setLoading(false)
    
  }

  return (
    <>
      <Card>
   
        <CardContent>

          <Typography variant="h6">
            Login
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

            <Button type="submit" disabled={loading}>Login</Button>
            
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default Login;