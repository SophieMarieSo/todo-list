const express = require('express');
const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller');
const router = express.Router();
const { createTask, getTask, updateTask, deleteTask } = taskController;

router.post('/', authController.authenticate, createTask);
router.get('/', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
