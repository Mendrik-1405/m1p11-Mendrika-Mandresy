const express = require('express');
const employeController = require('../controllers/employeController');
const {verifyToken} =require('../middlewares/authentification')

const router = express.Router();

// Définir les routes pour gérer les services
router.get('/:id', employeController.findById);
router.get('/',verifyToken, employeController.findAll);
router.post('/', employeController.create);
router.put('/:id', employeController.update);
router.post('/login', employeController.login);

module.exports = router;