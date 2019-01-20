const axios = require('axios');
const qs = require('qs');
const express = require('express');
const YandexDisk = require('yandex-disk').YandexDisk;
const config = require('../config/main');

let token = null;

const yandexRoute = express.Router();

yandexRoute.get('/code', (req, res) => {
    res.redirect('https://oauth.yandex.ru/authorize?response_type=code&client_id=4904eca87dcc4a119d7e42d828783110');
});

yandexRoute.get('/token', (req, res) => {
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
        req.session.yandexToken = response.data;
        res.sendStatus(200);
    })
    .catch(err => {
        console.error('YandexTokenERR:\n' + err);
        return Promise.reject(err);
    });
});

module.exports = yandexRoute;