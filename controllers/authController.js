const User = require("../models/User");
const AppError = require("../utils/AppError");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
    const {email , password} =  req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user) return next(new AppError(404, 'wrong credentials'));
    const matches = await bcrypt.compare(password, user.password);
    if(!matches) return next(new AppError(404, 'wrong credentials'));
    const accessToken = await jwt.sign({id:user.id}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn:'10h'});
    const refreshToken = await jwt.sign({id:user.id}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn:'7d'});
    user.password = undefined;
    res.status(200).json({message:'success', user, accessToken, refreshToken });
};

const register = async (req, res, next) => {
    const createdUser = await User.create(req.body);
    createdUser.password = undefined;
    res.status(201).json({message:'success', createdUser});
};

const refresh = async (req, res, next) => {

};

module.exports = {login, register, refresh};