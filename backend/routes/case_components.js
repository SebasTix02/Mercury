const express = require('express');
const controller = require('../controllers/case_components');

const router = express.Router();

router.get('/',controller.getCaseComponents);
router.get('/:id',controller.getCaseComponentById);
router.post('/',controller.insertCaseComponent);
router.put('/:id',controller.updateCaseComponent);
router.delete('/:id',controller.deleteCaseComponent);
router.put('/unsubscribe/:id',controller.unsubscribeCaseComponent);

module.exports = router;