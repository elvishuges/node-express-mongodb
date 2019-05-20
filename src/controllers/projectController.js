const express = require("express");
const router = express.Router();

const jwb = require("jsonwebtoken");
const authConfig = require("../config/auth");
const bcrypt = require("bcrypt");

const authMiddleware = require ('../middlewares/auth')

router.use(authMiddleware);

router.get('/',(req,res) =>{
    return res.send({ok:true});
})

router.get('/logado',(req,res) =>{
    return res.send({ok:true});
})



module.exports = exp => exp.use('/projects',router);