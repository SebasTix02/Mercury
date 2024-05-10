const express = require('express');
const controller = require('../controllers/category');

const router = express.Router();

router.get('/',controller.getCategories);
router.get('/:id',controller.getCategoryById);
router.post('/',controller.insertCategory);
router.put('/:id',controller.updateCategory);
router.delete('/:id',controller.deleteCategory);

module.exports = router;