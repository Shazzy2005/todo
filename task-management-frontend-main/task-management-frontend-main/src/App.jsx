import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Get from './Pages/Get'
import Post from './Pages/Post'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
   <>
   <Toaster />
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Get />}></Route>
      <Route path='/insert' element={<Post />}></Route>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
