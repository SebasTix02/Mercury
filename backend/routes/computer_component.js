const express = require('express');
const controller = require('../controllers/computer_component');

const router = express.Router();

router.get('/',controller.getComputerComponents);
router.get('/:id',controller.getComputerComponentById);
router.post('/',controller.insertComputerComponent);
router.put('/:id',controller.updateComputerComponent);
router.delete('/:id',controller.deleteComputerComponent);

module.exports = router;