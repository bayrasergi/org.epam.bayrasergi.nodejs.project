const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/main');
const User = require('../model/user');
const userRepository = require('../repository/userRepository');
const uuid = require('uuid/v4');

function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10
    });
}

function setUserInfo(req) {
    return {
        _id: req._id,
        email: req.email
    }
}

module.exports.login = function(req, res, next) {
    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT' + generateToken(userInfo),
        user: userInfo
    });
};

module.exports.register = function(req, res, next) {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const position = req.body.position;
    const password = crypto.createHash('sha256').update(req.body.password).digest('base64');;

    // TODO: Add checks for fields

    let user = userRepository.findUserByEmail(email);
    if (email === null) {
        user = new User(uuid(), email, password, firstName, lastName, position, null);
        userRepository.createUser(user);

        const userInfo = setUserInfo(user);
        
        res.status(201).json({
            token: 'JWT' + generateToken(userInfo),
            user: userInfo
        });
    }
};