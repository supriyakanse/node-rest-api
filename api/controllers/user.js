
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jst=require("jsonwebtoken");
const User=require("C:/Users/user/Documents/node/node-rest-api/api/models/user.js")

exports.user_signup=(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if (user.length>=1){
        return res.status(409).json({
            message:"mail exists"
        });
    }else{
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                })
            }else{
                const user= new User({
                    _id:new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    password: hash
                })
                user.save()
                .then(result=>{
                    console.log(result)
                    res.status(201).json({
                        message:"User Created Successfully"
                    })
                })
                .catch(err=>{
                    console.log(err)
                    res.status(500).json({
                        error:err
                    })
                })
            }
        })  
    }
    })
}

exports.user_login=(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(404).json({
                message:"auth failed"
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if (err){
                return res.status(401).json({
                    message:"auth failed"
                });
            }
            if(result){
                const token=jst.sign({
                    _id:user[0]._id,
                    email:user[0].email
                },process.env.JWT_KEY,{
                    expiresIn:"1h"
                });
                
                return res.status(200).json({
                    message:"auth success",
                    token:token
                });
            }
            res.status(401).json({
                message:"auth failed"
            });
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

exports.user_delete=(req,res,next)=>{
    User.deleteOne( { _id:req.params.userId})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"User Deleted Successfully"
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })  
    })
}