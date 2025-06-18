import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Landing,Signup,Homepage,Profile, PageNotFound} from './pages/index.js'
import { Provider } from 'react-redux'
import store from './store/store.js'

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
    },
    {
      path:'/home',
      element:<Homepage/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/*',
      element:<PageNotFound/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
