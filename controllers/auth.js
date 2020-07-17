const User=require("../models/user");
const jwt=require("jsonwebtoken");
const expressJwt=require("express-jwt");
const {check, validationResult } = require("express-validator");
exports.signup=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const user=new User(req.body);
    user.save((err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Not Able TO SignUp"
            });
        };
        res.json({
            name:user.name,
            lastname:user.lastName,
            id:user._id
        })
    })
};
exports.signin=(req,res)=>{
const {email,password}=req.body;
const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"User Doesn't Exist"
            })
        }
        if(!user.authenticate(password))
        {
            return res.status(401).json({
                error:"email and password do not match"
            })
        }
        //writting cookies
        const token=jwt.sign({_id:user._id},process.env.SECRET);
        //putting cookies
        res.cookie("token",token,{expire:new Date()+9999});
        //sending res to front end
        const {id,name,email,role}=user;
        return res.status(200).json({
            token:token,
            id:id,
            name:name,
            email:email,
            role:role
        });
    })   
}
exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"Hello Signout Sucessful"
    });
};
exports.isSignIn=expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});
exports.isAuthenticated=(req,res)=>{
    let checker=req.profile&&req.auth&&req.profile._id==req.auth._id;
    if(!checker){
        res.status(403).json({
            error:"Access Denied"
        })
    }
};
exports.isAdmin=(req,res)=>{
    if(req.role==0)
    return res.status(403).json({
        error:"You Are Not Admin, Access Denied"
    })
};