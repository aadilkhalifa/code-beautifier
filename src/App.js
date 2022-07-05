import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

import Home from './Components/Home/Home'

function App() {
  return (
    <div>
      <Home/>
      <Toaster position="bottom-center"  />
    </div>
  )
}

export default App
