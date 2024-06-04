const express = require('express');
const controller = require('../controllers/dashboard');

const router = express.Router();

router.get('/',controller.getDashboardInfo);

module.exports = router;