var express=require("express");
var router=express.Router();
const {check}=require("express-validator")
const {signout,signup,signin}=require("../controllers/auth");
router.post("/signup",[
    check("name","Name Must Be Three Character Long").isLength({min:3}),
    check("email","Email is Required").isEmail(),
    check("password","Password Must Be Four Character Long").isLength({min:4})
],signup);
router.post("/signin",[
    check("email","Email is Required").isEmail(),
    check("password","Password Is Required").isLength({min:1})
],signin);
router.get("/signout",signout);

module.exports=router;