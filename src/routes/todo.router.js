const todoController = require('../controllers/todo.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const express = require('express');

const router = express.Router();

router.post('/', authMiddleware, todoController.createTodo);
router.get('/', authMiddleware, todoController.getAllTodos);
router.get('/:id', authMiddleware, todoController.getTodoByID);
router.put('/:id', authMiddleware, todoController.updateTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
