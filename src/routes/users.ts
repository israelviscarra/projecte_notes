const express= require('express');
const bcrypt = require("bcryptjs");
const router = express()
const User =require('../models/user');
const Note =require('../models/note')
// const {body,validationResult} =require('express-validator');
const passport =require('passport');
// const jwt = require('jsonwebtoken')
const config= require('../config/config')

router.get('/users/signin',(req,res)=>{
    res.render('users/signin');
})
// router.post('/users/signin',async(req,res,next) => {
//     const {email,password} = req.body;
//     const errors=[];
//     const user = await User.findOne({email:email});
//     if (!user) {
//         return res.status(404).send('El correo no existe')
//         // errors.push({text:'El correo no existe'});
//     }

//     const validPassword = await user.validatePassword(password);
//     if (!validPassword) {
//         return res.status(401).json({auth:false,token:null})
//         // errors.push({text:'Token no valid'});
//     }
//     const token = jwt.sign({id:user._id}, config.secret,{
//         expiresIn:60*60*2
//     });
//     // localStorage.setItem("x-access-token", JSON.stringify({token:token}));

//     if (errors.length > 0) {
//         res.render('users/signin',{errors,email,password});
//     }
//     // if (token=="") {
//     //     res.send('ERROR')
        
//     // }else{
//     //     req.token = token
//     //     next()
//     // }
//     res.send({auth:true,token});
//     console.log({auth:true,token});
    
// })
router.post('/users/signin', passport.authenticate('local',{
  successRedirect:'/notes',
  failureRedirect:'/users/signin',
  failureFlash:true
}));

// router.get('/protected' ,ensureToken,(req,res)=>{
//     res.json({
//         text:'protected'
//     });
// });
// function ensureToken(req,res, next){
//     const bearer = req.headers['authorization'];
//     console.log(bearer);
// }

router.get('/users/signup',(req,res)=>{
    res.render('users/signup');
})
router.get('/backend', async (req,res)=>{
    const notes = await Note.find({user:req.user.id}).sort({ date: "desc" }).lean();
    res.render('backend',{notes});
})

router.post('/users/signup', async (req,res) => {
    const errors=[];
    const { name, email, password, confirm_password } = req.body;
    if (name.length <= 0) {
        errors.push({text:'Incerte tu nombre'});
    }
    if (password!=confirm_password) {
        errors.push({text:'No coincide el password'});
    }
    if (password.length < 4) {
        errors.push({text:'La contraseña  debe de ser al menos de 4 caracteres'});
    }
    if (errors.length > 0) {
        res.render('users/signup',{errors,name,email,password,confirm_password});
    }else{
        const emailUser = await User.findOne({email:email})
        if (emailUser) {
            req.flash('error_msg','EL correo ya esta en uso');
            res.redirect('/users/signup');
        } else {
            // Saving a New User
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "You are registered.");
            res.redirect("/users/signin");
        }
    }
})

router.get('/users/logout',(req,res) => {
    req.logout();
    res.redirect('/')
})
module.exports=router;
