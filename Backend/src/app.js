import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'


const app=express();

app.use(cors({
    origin:function (origin,callback){
        callback(null,true);
    },
    credentials:true
}));
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static('public'));
app.use(cookieParser());


import userRoutes from './routes/user.routes.js'
app.use('/api/u1',userRoutes);
app.use('/api/u2',userRoutes);
app.use('/api/u3',userRoutes);

export default app;