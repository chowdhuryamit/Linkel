import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux'

const App = () => {
  const userStatus=useSelector((state)=>state.authStatus.status);
  const navigate=useNavigate();
  useEffect(()=>{
    if(userStatus){
      navigate('/home');
    }
  },[userStatus])
  return (
   <>
   <ToastContainer/>
   <Outlet/>
   </>
  )
}

export default App
