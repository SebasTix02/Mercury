const express = require('express');
const controller = require('../controllers/asset');

const router = express.Router();

router.get('/',controller.getAssets);
router.get('/:id',controller.getAssetById);
router.post('/',controller.insertAsset);
router.put('/:id',controller.updateAsset);
router.delete('/:id',controller.deleteAsset);

module.exports = router;