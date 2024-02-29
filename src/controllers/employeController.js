const Employe = require("../models/employeModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const multer=require('multer');

class employeController {
  async create(req, res) {
    try {
      const employe = new Employe(req.body);
      await employe.save();
      res.status(201).json(employe);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(employe);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

  async findById(req, res) {
    try {
      const employe = await Employe.findById(req.params.id);
      res.status(200).json(employe);
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }

  async findAll(req, res) {
    try {
      const employes = await Employe.find({});
      res.status(200).json(employes);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const employes = await Employe.findOne(req.body);
      if (employes == null || req.body.password !== employes.password) {
        res.status(204).json(employes);
      } else {
        const token = jwt.sign(
          { id: employes._id.toString() },
          process.env.SECRET_KEY,
          { expiresIn: "120s" }
        );
        console.log(token);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        res.status(200).json(employes);
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async createwithphoto(req, res) {
    try {
      // Access uploaded file via req.file
      const contents = fs.readFileSync(req.file.path);
      const base64Image = contents.toString("base64");
      // Convert the file to base64
      console.log(req.file);
      // You can now save the file path to your database
      // For example, if you're using Mongoose:
      const employe = new Employe({
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        sexe: req.body.sexe,
        photo: base64Image,
      });

      employe
        .save()
        .then(() => res.json(employe))
        .catch((err) => res.status(500).json({ error: err.message }));
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
}
module.exports = new employeController();
