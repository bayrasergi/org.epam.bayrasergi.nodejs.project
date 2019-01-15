const express = require('express');
const passport = require('./auth/auth');
const app = express();

app.use(passport.initialize());
app.use(passport.session());