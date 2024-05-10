const express = require('express');
const controller = require('../controllers/software');

const router = express.Router();

router.get('/',controller.getSoftware);
router.get('/:id',controller.getSoftwareById);
router.post('/',controller.insertSoftware);
router.put('/:id',controller.updateSoftware);
router.delete('/:id',controller.deleteSoftware);

module.exports = router;