import { useState } from 'react'


import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Join from './pages/Join'
import Create from './pages/Create'
import Code from './pages/Code'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <Home/> */}
      {/* <Join/> */}
      {/* <Create/> */}
      <Code/>
    </>
  )
}

export default App
