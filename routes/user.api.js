const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { createUser } = userController;

router.post('/', createUser);

module.exports = router;
