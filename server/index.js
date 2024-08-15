import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './route/route.js'
dotenv.config()
const app=express()
const port=process.env.PORT||5000
//middleware
app.use(express.json())
app.use(cors())
//server
app.listen(port,()=>{
  console.log(`server runing on port ${port}`)
})
//db conncetion
mongoose.connect(process.env.DB_URL)
.then(()=>{
  console.log('db connectd!')

}).catch((err)=>{
  console.log('db connection err!')
})
//route
app.use('/api',router)

