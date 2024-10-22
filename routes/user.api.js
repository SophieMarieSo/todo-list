const express = require('express');
const router = express.Router();
const { authenticate } = require('../controller/auth.controller');
const userController = require('../controller/user.controller');
const { createUser, loginWithEmail, getUser } = userController;

// 회원가입
router.post('/', createUser);

// 로그인
router.post('/login', loginWithEmail);

// 토큰을 통해 사용자 id 추출 -> 해당 id로 사용자 객체 보내기
router.get('/me', authenticate, getUser);

module.exports = router;
