const express = require('express');
const controller = require('../controllers/building');

const router = express.Router();

router.get('/',controller.getBuildings);
router.get('/:id',controller.getBuildingById);
router.post('/',controller.insertBuilding);
router.put('/:id',controller.updateBuilding);
router.delete('/:id',controller.deleteBuilding);

module.exports = router;