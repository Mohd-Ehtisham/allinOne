const express = require("express");
const router = express.Router();
const bycrpt = require("bcryptjs")
const jwt = require('jsonwebtoken')

require("../DB/conn");

const authenticate = require('../Middleware/Authenticate')

const Posts = require("../Models/PostSchema");
const Users = require("../Models/UserSchema");

router.get('/admin',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

router.post("/register",async(req,res)=>{
    const {role,name,email,password} = req.body;
    try {
        if(!role || !name || !email || !password){
            res.status(422).json({message:"Fill all the fields"})
        }
        const userEx = await Users.findOne({email:email});
        if(userEx){
            return res.status(422).json({message:"User Already Exist"})
        }
        const newuser = new Users({role,name,email,password});
        const Newuser = newuser.save();
        if(Newuser){
            res.status(201).json({message:"New user Added"})
        }else{
            res.status(422).json({message:"Failed to add user"})
        }
    } catch (error) {
        return res.json({message:"Server Error"})
    }
});

router.post("/login",async(req,res)=>{
    try {
        const { email} = req.body;
        const {password} = req.body;
        
        const login = await Users.findOne({email});
        
        if(login){
            const isMatch = await bycrpt.compare(password, login.password);
            token= await login.generateAuthToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });
            
            if(!isMatch){
                res.status(400).json({message:"Invalid password"});  
            }else{
                req.data = login;
                const loginData = login;
                const article = await Posts.find({email});
                if(article){
                    res.json({
                        myarticles:article,
                        loginDetails:loginData
                    })
                }else{
                    res.json({
                        message:"No Article Found"
                    })
                }
            }
        }else{
            res.status(400).json({message:"Invalid Email"});
        } 
    } catch (error) {
        console.log(error)
    }
})

router.delete("/deleteUser",async(req,res)=>{
    try {
        const {usermail} = req.body.Useremail;
        const userEx = await Users.findOne({email:usermail});
        if(userEx){
            const del = await Users.deleteMany({ email: usermail });
            if(del){
                res.json({
                    message:"User Deleted"
                })
            }else{
                res.json({
                    message:"User not Deleted"
                })
            }
        }else{
            res.json({
                message:"User not found"
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post("/newarticle",async(req,res)=>{
    const{email,title,desc}=req.body;
    console.log(email);
    try {
        if(!email || !title || !desc){
            res.status(422).json({
                message:"Fill all the fields"
            });
        }
        const newpost = new Posts({email,title,desc});
        const newart = await newpost.save()
        if(newart){
            
            res.status(201).json({
                message:"Article Added"
            })
        }else{
            res.status(422).json({
                message:"Failed to add"
            })
        }
    } catch (error) {
        res.status(422).json({
            message:error
        })
    }
})


router.post("/deleteArticle",async(req,res)=>{
    try {
        const {title} = req.body;
        if(!title){
            return res.status(422).json({message:"please fild all the fields"})   
        }
        const arfind = await Posts.findOne({title:title});
        if(arfind){
            const cat = await Posts.deleteMany({title:title});
            if(cat){
                res.status(201).json({message:"Deleted"})
            }else{
                res.status(422).json({message:"Articel not found"})
            }
        }else{
            res.status(522).json({message:"Not found"})
        }
    } catch (error) {
        res.status(522).json({message:"Server Error"})
    }
})

router.get("/getArticles",async(req,res)=>{
    try {
        const article = await Posts.find();
        if(article){
            res.status(201).json({
                data:article
            })
        }else{
            res.json({
                error:"Article not found"
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post("/getArticle",async(req,res)=>{
    try {
        const email = req.body.email;
        const article = await Posts.find({email});
        if(article){
            res.status(201).json({
                data:article
            })
        }else{
            res.json({
                error:"Article not found"
            })
        }
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;