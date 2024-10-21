const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { createUser, loginWithEmail } = userController;

// 회원가입
router.post('/', createUser);

// 로그인
router.post('/login', loginWithEmail);

module.exports = router;
