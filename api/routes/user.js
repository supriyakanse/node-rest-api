const express=require("express")
const router=express.Router();
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jst=require("jsonwebtoken");
const checkAuth=require("C:/Users/user/Documents/node/node-rest-api/api/middleware/check-auth.js")
const User=require("C:/Users/user/Documents/node/node-rest-api/api/models/user.js")
const UserController=require("C:/Users/user/Documents/node/node-rest-api/api/controllers/user.js")
router.post("/signup",UserController.user_signup)
router.post('/login',UserController.user_login)

router.delete('/:userId',checkAuth,UserController.user_delete)

module.exports=router;