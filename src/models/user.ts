
const mongoose = require('mongoose')
const {Schema, model}=mongoose;
const bcrypt=require('bcryptjs');
const UserSchema= new Schema({
    name:{
        type:String,require:true
    },
    email:{
        type:String,require:true
    },
    password:{
        type:String,require:true
    },
    date:{
        type:Date, dafault:Date.now
    },
});
//sifrar contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};
  //Compara la contraseña que te esta dando el cliente i lo comparar con la base de datos
  UserSchema.methods.validatePassword =  function (password) {
    return  bcrypt.compare(password, this.password);
  };
module.exports=mongoose.model('User',UserSchema);