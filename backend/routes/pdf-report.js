const express = require('express');
const controller = require('../controllers/pdf-report');

const router = express.Router();

router.get('/upe',controller.getUpeReport);
router.get('/computers',controller.getComputersReport);
router.get('/computers/:id',controller.getComputersReport);
router.get('/age',controller.getAgeReport);
router.get('/dependency',controller.getDependencyReport);
router.get('/dependency/:id',controller.getDependencyReport);
router.get('/lab',controller.getLabReport);
router.get('/lab/:id',controller.getLabReport);
router.get('/software',controller.getSoftwareReport);

module.exports = router;