import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Landing,Signup} from './pages/index.js'

const router=createBrowserRouter([{
  path:'/',
  element:<App />,
  children:[
    {
      path:'/',
      element:<Landing/>
    },
    {
      path:'/signup',
      element:<Signup/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
