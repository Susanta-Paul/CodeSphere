import { Fragment, useState } from 'react'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"


import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Join from './pages/Join'
import Create from './pages/Create'
import Code from './pages/Code'
import Reels from './Components/Reels'
// import Execute from './pages/Execute'


function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        <Route path='/' element={<Home/>} />
        <Route path='signup' element={<Signup/>} />
        <Route path='login' element={<Login/>} />
        <Route path='join' element={<Join/>} />
        <Route path='create' element={<Create/>} />
        {/* <Route path='execute' element={<Check/>} /> */}
        <Route path='code/:roomName' element={<Code/>} />
      </Fragment>
    )
  )


  return (
    <>
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <Home/> */}
      {/* <Join/> */}
      {/* <Create/> */}
      {/* <Code/> */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
