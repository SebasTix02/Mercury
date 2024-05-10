const express = require('express');
const controller = require('../controllers/login');

const router = express.Router();

router.post('/',controller.validateCredentials);

module.exports = router;