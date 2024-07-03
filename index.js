require('dotenv').config()
const express=require('express')
const cors=require('cors')
const authServer=express()
const router=require('./Router/router')
authServer.use(cors())
authServer.use(express.json())
authServer.use(router)
const PORT=3000 || process.env

authServer.get('/',(req,res)=>{
    res.status(200).send('<h1>Auth server is running</h1>')
})

authServer.listen(PORT,()=>{
    console.log(`Auth server started at PORT: ${PORT}`);
})