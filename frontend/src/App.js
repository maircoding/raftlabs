import React, { useState } from 'react'
import Socket from './components/Socket';
import Login from './components/Login'

function App() {
  const [user, setUser] = useState('')

  const isUser = (t) => {
    setUser(t)
  }

  if (user) return( <Socket user={user}/> )
  return (<Login setUserProp={isUser} /> )
}

export default App