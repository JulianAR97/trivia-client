import React from 'react';
import Home from 'components/Home'
import Navbar from 'components/Nav/Navbar'
import Signup from 'components/Auth/Signup'
import Login from 'components/Auth/Login'
import { AuthProvider } from 'contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh'
  }
}))

const App = () => {
  const classes = useStyles() 
  
  return (
    <div className={classes.app}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;
