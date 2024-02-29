const Manager = require('../models/managerModel');
const jwt = require("jsonwebtoken");

class managerController {
    async create(req, res) {
        try {
          const manager = new Manager(req.body);
          await manager.save();
          res.status(201).json(manager);
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }
    async update(req, res) {
        try {
            const manager = await Manager.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(manager);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    async find(req, res) {
        try {
            const manager = await Manager.find({});
            res.status(200).json(manager);  
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }
    
    async findAll(req, res) {
        try {
          const managers = await Manager.find({});
          res.status(200).json(managers);
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }
    
      async login(req, res) {
        try {
          const managers = await Manager.findOne(req.body);
          if (managers == null || req.body.password !== managers.password) {
            res.status(204).json(managers);
          } else {
            const token = jwt.sign(
              { id: managers._id.toString() },
              process.env.SECRET_KEY,
              { expiresIn: "120s" }
            );
            console.log(token);
            res.cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
            });
            res.cookie("role", "manager", {
                httpOnly: true,
                secure: true,
                sameSite: "None",
            });
            res.status(200).json(managers);
          }
        } catch (error) {
          res.status(500).send({ message: error.message });
        }
      }
}

module.exports = new managerController();