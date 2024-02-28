const express = require('express');
const managerController = require('../controllers/managerController');

const router = express.Router();

router.get('/', managerController.find);
router.post('/', managerController.create);
router.put('/:id', managerController.update);
router.post('/login', managerController.login);

module.exports = router;