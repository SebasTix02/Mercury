const express = require('express');
const controller = require('../controllers/pdf_report');

const router = express.Router();

router.get('/upe',controller.getUpeReport);
router.get('/computer',controller.getComputersReport);
router.get('/computer/:id',controller.getComputersReport);
router.get('/age',controller.getAgeReport);
router.get('/dependency',controller.getDependencyReport);
router.get('/dependency/:id',controller.getDependencyReport);
router.get('/location',controller.getLocationReport);
router.get('/location/:id',controller.getLocationReport);
router.get('/software',controller.getSoftwareReport);

module.exports = router;