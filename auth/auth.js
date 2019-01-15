const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userRepository = require('../repository/userRepository');
const crypto = require('crypto');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    const user = userRepository.findUserByEmail(email);
    const encPassword = crypto.createHash('sha256').update(password).digest('base64');
    if (user === null || user.password !== encPassword) {
        return done(null, false, `Wrong email or password`)
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.userId);
});

passport.deserializeUser((userId, done) => {
    const user = userRepository.findUserById(userId);
    if (user === null) {
        done(null, false, 'User id is not found!');
    }
    done(null, user);
});

module.exports = passport;