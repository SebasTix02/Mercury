const express = require('express');
const controller = require('../controllers/qr');

const router = express.Router();

router.get('/',controller.getAvailableAssets);
router.post('/',controller.getQrTags);

module.exports = router;