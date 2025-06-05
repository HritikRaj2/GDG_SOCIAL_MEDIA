import { useState } from 'react'
import './App.css'
import Authentication from './pages/Authentication/Authentication'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Authentication/>
    
    </>
  )
}

export default App
