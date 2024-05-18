const express = require('express');
const controller = require('../controllers/report');

const router = express.Router();

router.get('/upe',controller.getUpeReport);

module.exports = router;