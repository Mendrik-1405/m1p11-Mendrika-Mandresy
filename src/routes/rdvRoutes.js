const express = require('express');
const rdvController = require('../controllers/rdvController');


const router = express.Router();

// Définir les routes pour gérer les services
router.get('/:id', rdvController.findById);
router.get('/', rdvController.findAll);
router.post('/', rdvController.create);
router.put('/:id', rdvController.update);
router.get('/rdvempl/:employeId', rdvController.findByIdemploye);
router.put('/:id', rdvController.delete);


module.exports = router;