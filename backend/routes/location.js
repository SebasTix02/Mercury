const express = require('express');
const controller = require('../controllers/location');

const router = express.Router();

router.get('/',controller.getLocations);
router.get('/:id',controller.getLocationById);
router.post('/',controller.insertLocation);
router.put('/:id',controller.updateLocation);
router.delete('/:id',controller.deleteLocation);

module.exports = router;