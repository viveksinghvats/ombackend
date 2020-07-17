const User=require("../models/user");
const express=require("express");
const router=express.Router;
const {isSignIn,isAuthenticated,isAdmin}=require("../controllers/auth");
const {getUserById,getUser}=require("../controllers/user");
//router.param("userId",getUserById);
//router.get("/user/:userId",isSignIn,isAuthenticated,getUser);
module.exports=router;
