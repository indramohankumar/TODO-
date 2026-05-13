const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'3d'});
}

//signup a new user
const signup = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token});
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

//login an existing user
const login = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token});
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {signup, login};
