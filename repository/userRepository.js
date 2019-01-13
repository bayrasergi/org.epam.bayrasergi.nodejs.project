const db = require('./db');
const User = require('../model/user');

module.exports.getUser = (username, password) => {
    let users = db.get('users');
    if (!users || !users.value().length){
        return null;
    }
    const user = users.find({username: username, password: password}).value();
    if (!user){
        return null;
    }
    return new User(user.userId, user.email, user.password, user.surname, user.position, user.pathToPhoto);
};

module.exports.addUser = (user) => {
    if (user.email != null &&
        user.password != null &&
        user.name != null &&
        user.surname != null &&
        user.position != null &&
        user.pathToPhoto != null){
            db.get('users').push(user).write();
        }
}