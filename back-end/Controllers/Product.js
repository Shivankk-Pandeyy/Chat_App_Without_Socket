const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//DOTENV
const dotenv=require('dotenv').config();
//COOKIE-PARSER
const cookieParser=require('cookie-parser');
app.use(cookieParser());
//BCRYPT
const bcrypt=require('bcrypt');
//JWT
const jwt=require('jsonwebtoken');
//USER SCHEMA
const User=require("../Schema/User")
//FUNCTION CALL FOR ROUTER 
const HomepageGetRequest=async(req,res)=>{
    try{
        res.cookie("name","ShivankPandey");
        return res.status(200).json({message:"ROUTER SUCCESSFUL FOR CHAT APPLICATION"});
    }
    catch(err){
        console.log(err);
    }
} 
//USER REGISTRATION
const UserRegister=async(req,res)=>{
    const {name,email,password}=req.body;
    const dummy=await User.findOne({email});
    if(dummy){
        return res.status(400).json({message:"EMAIL"});
    }
    else{
        try{
            bcrypt.genSalt(10,async(err,salt)=>{
                bcrypt.hash(password,salt,async(err,hash)=>{
                    const user=await new User({
                        name,
                        email,
                        password:hash,
                    });
                    await user.save();
                    let token=await jwt.sign({email:email},"SHIVANK");
                    res.cookie("TOKEN",token);
                    const Valid=await User.findOne({name,email});
                    return res.status(200).json({message:"CREATED",id:Valid._id});
                })
            })
        }
        catch(err){
            console.log(err);
        }
    }
}
//USER LOGIN
const UserLogin=async(req,res)=>{
    const{email,password}=req.body;
    const Valid=await User.findOne({email});
    try{
        if(Valid){
            const bool=await bcrypt.compare(password,Valid.password);
            //console.log(bool);
            if(bool){
                let token=await jwt.sign({email:email},"SHIVANK");
                res.cookie("TOKEN",token);
                return res.status(200).json({message:"LOGIN",id:Valid._id});
            }
            else{
                return res.status(400).json({message:"PASSWORD"});
            }
        }
        else{
            return res.status(400).json({message:"USERX"});
        }
    }
    catch(err){
        console.log(err);
    }
}
//SINGLE USER
const singleUser=async(req,res)=>{
    const {id}=req.params;
    const userdetails=await User.findById({_id:id});
    try{
        return res.status(200).json(userdetails);
    }
    catch(err){
        console.log(err);
    }
}
//UPDATE DETAILS
const updateUser=async(req,res)=>{
    const {id}=req.params;
    const {name,password}=req.body;
        try{  
            bcrypt.genSalt(10,async(err,salt)=>{
                bcrypt.hash(password,salt,async(err,hash)=>{
                    const user=await User.findByIdAndUpdate({_id:id},{
                        name,
                        password:hash
                    });
                    await user.save();
                    return res.status(200).json({message:"UPDATED"})
                })
            })
            }
            catch(err){
                console.log(err);
            }
}
//All USERS
const AllUsers=async(req,res)=>{
    try{
        const user=await User.find({});
        return res.status(200).json(user);
    }
    catch(err){
        console.log(err);
    }
}
//SET STATUS
const setStatus=async(req,res)=>{
    console.log(req.body)
    const {id}=req.params;
    const {status}=req.body;
    try{
        const user=await User.findByIdAndUpdate({_id:id},{status});
        await user.save();
        return res.status(200).json({message:"STATUS UPDATED"});
    }
    catch(err){
        console.log(err);
    }
}
//ADD MESSAGE
const addMessage=async(req,res)=>{
    const {id}=req.params;
    const {sendID,recvID,Msg}=req.body;
    const ADD=await User.findById({_id:id});
    const ADD1=await User.findOne({_id:recvID});
    try{
        await ADD.message.push({sendID,recvID,Msg});
        await ADD.save();
        await ADD1.message.push({sendID,recvID,Msg});
        await ADD1.save();
        return res.status(200).json({message:"MSG SENT"});
    }
    catch(err){
        console.log(err);
    }
}
//DISPLAY MESSAGE
const displayMessage=async(req,res)=>{
    try{
        const message=await User.find({});
        return res.status(200).json(message);
    }
    catch(err){
        console.log(err);
    }
}
module.exports={HomepageGetRequest,UserRegister,UserLogin,singleUser,updateUser,AllUsers,setStatus,displayMessage,addMessage};