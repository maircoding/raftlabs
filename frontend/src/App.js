import React from 'react'
import Socket from './components/Socket';
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Protected Component={Login} />} />
        <Route exact path="/socket" element={<Protected Component={Socket} />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App