const express = require('express');
const{login,signup}=require('../controllers/usercontroller');
//user constroller
const router=express.Router();
//login route
router.post('/login',login);
//signup route
router.post('/signup',signup);
module.exports=router;