const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
passport.use(new LocalStrategy({
    usernameField:'email'
},async(email,password,done) => {
    const user = await User.findOne({email:email});
    if (!user) {
        return done(null,false,{message:'Usuario no encontrado'});
    }else{
        const match = await user.validatePassword(password);
        if (match){
            return done(null,user);

        }else{
            return done(null,false,{message:'Contraseña incorrecta'})
        }
    }

}));
passport.serializeUser((user,done) => {
    // const token = jwt.sign({user},'secret_token');
    // localStorage.getItem(token) 
    // console.log(token);
    done(null,user.id);
})
passport.deserializeUser((id,done) => {
    User.findById(id,(err,user) => {
        done(err,user);
    });
});

