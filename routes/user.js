const express = require('express');

const user = require('../controller/user')
const verifyToken = require("../controller/auth").verifyToken


module.exports = express.Router().post('/signup', user.signUp)
    .post('/signin', user.signIn)
    .get('/home', verifyToken,user.home)
