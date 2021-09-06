import React from 'react';
import Home from 'components/Home'
import Navbar from 'components/Nav/Navbar'
import Signup from 'components/Auth/Signup'
import Login from 'components/Auth/Login'
import { AuthProvider } from 'contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => { 
  return (
    <div className="App">
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
