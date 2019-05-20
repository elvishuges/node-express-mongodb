const mongoose = require("../database/")
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    name:{ type: String, require:true},
    email:{type:String,unique:true,required:true,lowercase:true},
    // selected false para na buscar não retornar o password
    // porem, deve-se lembrar que no momento do login deve retornar a senha para comparar
    password:{type:String,required:true,select:false}, 
    createdAt:{type:Date,default:Date.now}
})

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    next();
})

const User = mongoose.model('User',UserSchema)

module.exports = User;