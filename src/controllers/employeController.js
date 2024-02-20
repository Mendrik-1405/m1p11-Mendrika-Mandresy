const Employe = require('../models/employeModel');
const jwt=require('jsonwebtoken');

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
            const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

    async login(req, res){
        try {
            const employes = await Employe.findOne(req.body);
            if (employes==null || req.body.password !== employes.password){
                throw Error("login error")
            }
            const token=jwt.sign({ id: employes._id.toString() },process.env.SECRET_KEY,{expiresIn:'120s'});
            res.cookie("token",token,{httpOnly:true});
            res.status(200).json({token});
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

}
module.exports = new employeController();