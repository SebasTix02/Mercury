const express = require('express');
const controller = require('../controllers/computer');

const router = express.Router();

router.get('/',controller.getComputers);
router.get('/:id',controller.getComputerById);
router.post('/',controller.insertComputer);
router.put('/:id',controller.updateComputer);
router.delete('/:id',controller.deleteComputer);

module.exports = router;