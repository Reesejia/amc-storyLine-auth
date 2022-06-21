const express = require('express');

const {storyBaseUrl, routePrefix, proxyPrefix} = require('config')
const router = express.Router();

const map = {
    "fundCompass":"/pic/homepage/%E7%BD%97%E7%9B%98%E6%9B%B4%E6%96%B00602/start.html#c=1&id=7m89ln&p=%E6%A1%86%E6%9E%B6-%E9%A1%B6%E9%83%A8%E4%BA%8C%E7%BA%A7"
  }

router.get(`/login`, async (req, res, next) => {
    res.setHeader('type', "text/html;charset=utf8;")
    res.render('home/index', {title: '登陆'})
});

router.post(`/login`, async (req, res, next) => {
    const { username, password } = req.body
    console.log(2222)
    if (username && password) {
        // app.use('/', proxy(target))
        console.log('111', `${proxyPrefix}${map["fundCompass"]}`)
        res.redirect(`${proxyPrefix}${map["fundCompass"]}`)
        // res.redirect(`${proxyPrefix}`)
    } else {
        res.redirect(`${routePrefix}/user/login`)
    };
    console.log('password', password)
});

module.exports = router