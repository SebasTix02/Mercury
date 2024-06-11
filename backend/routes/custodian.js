const express = require('express');
const controller = require('../controllers/custodian');

const router = express.Router();

router.post('/',controller.getCustodianAssets);
router.put('/',controller.updateCustodian);

module.exports = router;