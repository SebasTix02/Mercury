const express = require('express');
const controller = require('../controllers/brand');

const router = express.Router();

router.get('/',controller.getBrands);
router.get('/:id',controller.getBrandById);
router.post('/',controller.insertBrand);
router.put('/:id',controller.updateBrand);
router.delete('/:id',controller.deleteBrand);

module.exports = router;