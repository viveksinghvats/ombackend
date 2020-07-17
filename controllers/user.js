var User=require("../models/user");
exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"User Not found"
            });
        }
        req.profile=user;
        next();
    });
};
exports.getUser=(req,res)=>{
    //todo:get back here for  password
    req.profile.salt=undefined;
    req.profile.password=undefined;
    return res.json(req.profile);
}

