const User = require("../models/User");
const AppError = require("../utils/AppError");
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return next(new AppError(401, 'Unauthorized'));
    const id = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(id);
    if(!user) return next(new AppError(404, 'Invalid Token'));
    req.user = user;
    next();
};

module.exports = {verifyToken};