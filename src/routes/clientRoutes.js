const express = require('express');
const clientController = require('../controllers/clientController');
const {verifyToken} =require('../middlewares/authentification')

const router = express.Router();

// Définir les routes pour gérer les services
router.get('/:id', clientController.findById);
router.get('/',verifyToken, clientController.findAll);
router.post('/', clientController.create);
router.put('/:id', clientController.update);
router.post('/login', clientController.login);
router.delete('/delete/:id', clientController.delete);
router.post('/email', clientController.sendEmail);

module.exports = router;