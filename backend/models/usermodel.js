const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const schema = mongoose.Schema;
const userschema = new schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

//static signup method
userschema.statics.signup = async function(email, password){
    //validation
    if(!validator.isEmail(email)){
        throw Error('Invalid email');
    }
    if(!validator.isLength(password, {min: 6})){
        throw Error('Password must be at least 6 characters');
    }
    const exists = await this.findOne({email});
    if(exists){
        throw Error('Email already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({email, password: hash});
    return user;
}

//static login method
userschema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({email});
    if(!user){
        throw Error('Incorrect email');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error('Incorrect password');
    }
    return user;
}

module.exports = mongoose.model('User', userschema);