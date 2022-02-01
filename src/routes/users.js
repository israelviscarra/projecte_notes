var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var bcrypt = require("bcryptjs");
var router = express();
var User = require('../models/user');
var Note = require('../models/note');
// const {body,validationResult} =require('express-validator');
var passport = require('passport');
// const jwt = require('jsonwebtoken')
var config = require('../config/config');
router.get('/users/signin', function (req, res) {
    res.render('users/signin');
});
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
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
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
router.get('/users/signup', function (req, res) {
    res.render('users/signup');
});
router.get('/backend', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var notes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Note.find({ user: req.user.id }).sort({ date: "desc" }).lean()];
            case 1:
                notes = _a.sent();
                res.render('backend', { notes: notes });
                return [2 /*return*/];
        }
    });
}); });
router.post('/users/signup', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var errors, _a, name, email, password, confirm_password, emailUser, newUser, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                errors = [];
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, confirm_password = _a.confirm_password;
                if (name.length <= 0) {
                    errors.push({ text: 'Incerte tu nombre' });
                }
                if (password != confirm_password) {
                    errors.push({ text: 'No coincide el password' });
                }
                if (password.length < 4) {
                    errors.push({ text: 'La contraseña  debe de ser al menos de 4 caracteres' });
                }
                if (!(errors.length > 0)) return [3 /*break*/, 1];
                res.render('users/signup', { errors: errors, name: name, email: email, password: password, confirm_password: confirm_password });
                return [3 /*break*/, 6];
            case 1: return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                emailUser = _c.sent();
                if (!emailUser) return [3 /*break*/, 3];
                req.flash('error_msg', 'EL correo ya esta en uso');
                res.redirect('/users/signup');
                return [3 /*break*/, 6];
            case 3:
                newUser = new User({ name: name, email: email, password: password });
                _b = newUser;
                return [4 /*yield*/, newUser.encryptPassword(password)];
            case 4:
                _b.password = _c.sent();
                return [4 /*yield*/, newUser.save()];
            case 5:
                _c.sent();
                req.flash("success_msg", "You are registered.");
                res.redirect("/users/signin");
                _c.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
router.get('/users/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
module.exports = router;
