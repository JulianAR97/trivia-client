import React, { useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from 'firebase.js'


const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(false)

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return auth.signOut()
  }

  const googleAuth = () => {
    return auth.signInWithPopup(googleProvider)
  }

  useEffect(() => {
    // Firebase listener to notify when user is set
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false)
      setCurrentUser(user)
    })
    
    // unsubscribes when component is unmounted
    return unsubscribe
  }, [])
  

  const value = {
    currentUser,
    googleAuth,
    login,
    logout,
    signup,

  }

  return (
    <AuthContext.Provider value={value} >
      {!loading && children}
    </AuthContext.Provider>
  );
}



