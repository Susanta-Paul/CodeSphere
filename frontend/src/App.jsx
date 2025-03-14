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
import UserProtected from './pages/userProteceted'


function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        <Route path='/' element={<UserProtected><Home/></UserProtected>} />
        <Route path='signup' element={<Signup/>} />
        <Route path='login' element={<Login/>} />
        <Route path='join' element={<UserProtected><Join/></UserProtected>} />
        <Route path='create' element={<UserProtected><Create/></UserProtected>} />
        {/* <Route path='execute' element={<Check/>} /> */}
        <Route path='code/:roomName' element={<UserProtected><Code/></UserProtected>} />
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
