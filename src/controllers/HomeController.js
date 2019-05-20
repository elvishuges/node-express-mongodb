const express = require("express")
const router = express.Router("router")


const path = require('path')

router.get("/login",(req,res)=>{
    res.sendFile('login.html',{root:path.join(__dirname,'../views')})
})

module.exports = (exp) => exp.use('/home',router);