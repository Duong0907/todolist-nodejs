const express = require('express');
const errorHanlder = require('../middlewares/errorHandling.middlware');
const authController = require('../controllers/auth.controller');

const router = express.Router();
router.post('/login', errorHanlder, authController.login);

module.exports = router;
