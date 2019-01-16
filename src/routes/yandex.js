const axios = require('axios');
const express = require('express');

const yandexRoute = express.Router();

// TODO: extract client_id

yandexRoute.get('/code', (req, res, next) => {
    // axios.get('https://oauth.yandex.ru/authorize',
    // {
    //     params:{
    //         response_type: 'code',
    //         client_id: '4904eca87dcc4a119d7e42d828783110'
    //     }
    // });
    res.redirect('https://oauth.yandex.ru/authorize?response_type=code&client_id=4904eca87dcc4a119d7e42d828783110');
});

yandexRoute.get('/token', (req, res, next) => {
    let code = req.params.code;
    // if (!code) {
    //     res.redirect('https://oauth.yandex.ru/authorize?response_type=code&client_id=4904eca87dcc4a119d7e42d828783110');
    // }
    axios.post('https://oauth.yandex.ru/token', {
        grant_type: 'authorization_code',
        code: code,
        client_id: '4904eca87dcc4a119d7e42d828783110',
        client_secret: 'c1f6cfc9608444fc9776460420093c93'
    },
    {
        headers: { 
            'cache-control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
    })
    .then((response) => {
        res.send(response.body);
    })
    .catch((error) => {
        console.error(error.data);
    });
});

module.exports = yandexRoute;