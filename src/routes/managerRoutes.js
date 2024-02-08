const express = require('express');
const managerController = require('../controllers/managerController');

const router = express.Router();

router.get('/', managerController.find);
router.put('/:id', managerController.update);

module.exports = router;