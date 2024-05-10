const express = require('express');
const controller = require('../controllers/dependency');

const router = express.Router();

router.get('/',controller.getDependencies);
router.get('/:id',controller.getDependencyById);
router.post('/',controller.insertDependency);
router.put('/:id',controller.updateDependency);
router.delete('/:id',controller.deleteDependency);

module.exports = router;