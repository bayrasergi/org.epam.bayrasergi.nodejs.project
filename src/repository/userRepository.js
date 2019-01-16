const db = require('./db');
const User = require('../model/user');

module.exports.findUserByEmail = (email) => {
    let users = db.get('users');
    if (email === undefined || email === null || !email.length){
        return null;
    }
    const user = users.find({email: email}).value();
    if (!user){
        return null;
    }
    return user;
};

module.exports.findUserById = (userId) => {
    let users = db.get('users');
    if (userId === undefined || userId === null || !userId.length){
        return null;
    }
    const user = users.find({userId: userId}).value();
    if (!user){
        return null;
    }
    return user;
};

module.exports.createUser = (user) => {
    db.get('users').push(user).write();
};