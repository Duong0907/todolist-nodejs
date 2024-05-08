const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware.js');
const express = require('express');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/me', authMiddleware, userController.getCurrentUser);
router.get('/:id', authMiddleware, userController.getUserByID);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
