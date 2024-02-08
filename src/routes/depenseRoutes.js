const express = require('express');
const depenseController = require('../controllers/depenseController');

const router = express.Router();

router.get('/', depenseController.findAll);
router.post('/', depenseController.create);
router.put('/:id', depenseController.update);

module.exports = router;