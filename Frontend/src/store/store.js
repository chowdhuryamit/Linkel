import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js'

const store=configureStore({
    reducer:{
        authStatus:authSlice
    }
})

export default store