const express = require('express');
const employeController = require('../controllers/employeController');
const {verifyToken} =require('../middlewares/authentification');
let Employe = require('../models/employeModel');
let upload=require('../utils/upload');
const fs = require('fs');
const router = express.Router();

// Définir les routes pour gérer les services
router.get('/:id', employeController.findById);
router.get('/', employeController.findAll);
router.post('/', employeController.create);
router.put('/:id', employeController.update);
router.post('/login', employeController.login);

//upload
router.post('/create', upload.single('photo'),employeController.createwithphoto);
router.post('/upload', upload.single('photo'), (req, res) => {
    // Access uploaded file via req.file
    const contents = fs.readFileSync(req.file.path);
    const base64Image = contents.toString('base64');
    // Convert the file to base64
    console.log(req.file);
    // You can now save the file path to your database
    // For example, if you're using Mongoose:
    const employe = new Employe({
      name: req.body.name,
      password: req.body.password,
      phone: req.body.phone,
      sexe: req.body.sexe,
      photo: base64Image
    });
  
    employe.save()
      .then(() => res.json(employe))
      .catch(err => res.status(500).json({ error: err.message }));
  });


module.exports = router;