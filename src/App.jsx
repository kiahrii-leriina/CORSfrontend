import { useState } from 'react'
import Landing from './landing'
import './App.css'
import Display from './Display'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/display' element={<Display/>}/>
          <Route path='/display/:id' element={<Display/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
