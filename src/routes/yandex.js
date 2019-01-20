const axios = require('axios');
const qs = require('qs');
const express = require('express');
const YandexDisk = require('yandex-disk').YandexDisk;
const config = require('../config/main');

let token = null;

const yandexRoute = express.Router();

yandexRoute.get('/code', (req, res, next) => {
    res.redirect('https://oauth.yandex.ru/authorize?response_type=code&client_id=4904eca87dcc4a119d7e42d828783110');
});

yandexRoute.get('/token', (req, res, next) => {
    const body = qs.stringify({
        grant_type: 'authorization_code',
        code: req.query.code,
        client_id: '4904eca87dcc4a119d7e42d828783110',
        client_secret: 'c1f6cfc9608444fc9776460420093c93'
    });
    const header = {
        headers : {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }
    axios.post(
        'https://oauth.yandex.ru/token',
        body, 
        header)
    .then(response => {
        token = response.data.access_token;
        next();
    })
    .catch(err => {
        console.error(err);
        return Promise.reject(err);
    });
});

yandexRoute.get('/disk', (req, res, next) => {
    if (token === null) {
        res.redirect('https://oauth.yandex.ru/authorize?response_type=code&client_id=4904eca87dcc4a119d7e42d828783110');
    }
    console.log(token);
    res.send({"text": "works good!"});
});

module.exports = yandexRoute;