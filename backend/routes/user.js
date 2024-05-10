const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();

router.get('/',controller.getUsers);
router.get('/:id',controller.getUserById);
router.post('/',controller.insertUser);
router.put('/:id',controller.updateUser);
router.delete('/:id',controller.deleteUser);

module.exports = router;