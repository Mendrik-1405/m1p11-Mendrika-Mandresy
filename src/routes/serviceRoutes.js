const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/', serviceController.findAll);
router.post('/', serviceController.create);
router.put('/:id', serviceController.update);
router.delete('/delete/:id', serviceController.delete);

module.exports = router;