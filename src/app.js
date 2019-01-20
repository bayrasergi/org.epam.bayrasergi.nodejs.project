const express = require('express');
const config = require('./config/main');
const AuthRoute = require('./routes/authentication');
const YandexRoute = require('./routes/yandex');
const ReportsRoute = require('./routes/reports');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Enable CORS from client-side
// app.use(function(req, res, next) {  
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(AuthRoute);
app.use('/reports', ReportsRoute);
app.use('/yandex', YandexRoute);

app.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Server running on port: ${PORT}`);
  }
});

