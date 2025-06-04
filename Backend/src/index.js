import dotenv from "dotenv"
import connectionDB from "./db/index.js"
import app from "./app.js"

dotenv.config();
const port=process.env.PORT||7000;

connectionDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    })
})
.catch((error)=>{
    console.log("mongodb connection failed:",error);
})