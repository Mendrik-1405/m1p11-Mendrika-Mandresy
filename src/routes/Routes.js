const express = require('express');
const tacheController = require('../controllers/tacheController');


const router = express.Router();

// Définir les routes pour gérer les services
router.get('/:id', tacheController.findById);
router.get('/', tacheController.findAll);
router.post('/', tacheController.create);
router.put('/:id', tacheController.update);
router.put('/:id', tacheController.delete);


module.exports = router;