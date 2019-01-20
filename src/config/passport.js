const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userRepository = require('../repository/userRepository');
const crypto = require('crypto');
const config = require('./main');

const localAuth = new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'}, 
    (email, password, done) => {
        const user = userRepository.findUserByEmail(email);
        const encPassword = crypto.createHash('sha256').update(password).digest('base64');
        if (user === null || user.password !== encPassword) {
            return done(null, false, `Wrong email or password`)
        }
        return done(null, user);
    }
);
const jwtAuth = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: config.secret
    },
    (payload, done) => {
        const user = userRepository.findUserById(payload._id);
        if (!user){
            return done(null, false);
        }
        return done(null, user);
});

passport.use('jwt', jwtAuth);
passport.use('local', localAuth);

module.exports = passport;