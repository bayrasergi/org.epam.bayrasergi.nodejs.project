const axios = require('axios');
const qs = require('qs');
const express = require('express');

const reportsRoute = express.Router();

reportsRoute.use((req, res, next) => {
    if (!req.session.yandexToken){
        console.log(req.session.yandexToken);
        res.redirect('https://oauth.yandex.ru/authorize?response_type=code&client_id=4904eca87dcc4a119d7e42d828783110');
    }
    else {
        next();
    }
});

reportsRoute.get('/new-users', (req, res) => {
    res.status(200).send({';;': '::'});
});

module.exports = reportsRoute;