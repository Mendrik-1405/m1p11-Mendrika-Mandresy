const Rdv = require('../models/rdvModel');
const Client = require('../models/clientModel');


class rdvController {
    async create(req, res) {
        try {
            const rdv = new Rdv(req.body);
            await rdv.save();
            console.log("saved rdv");
            res.status(201).json(rdv);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

    async createwithClient(req, res) {
        try {
            console.log("idclient"+req.params.idclient);
            const client = await Client.findById(req.params.idclient);
            console.log("nomclient"+client.nom);
            if (!client) {
                return res.status(404).send({ message: "Client not found" });
            }
            const rdv = new Rdv(req.body);
            await rdv.save();
            client.rendezVous.push(rdv._id);
            await client.save();
            console.log("saved employe rdv");
            res.status(201).json(rdv);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

    async update(req, res) {
        try {
            const rdv = await Rdv.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(rdv);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

    async findById(req, res) {
        try {
            const rdv = await Rdv.findById(req.params.id);
            res.status(200).json(rdv);
        } catch (err) {
            res.status(404).send({ message: err.message });
        }
    }

    async findAll(req, res) {
        try {
            const rdvs = await Rdv.find({});
            res.status(200).json(rdvs);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
    
    async delete(req, res) {
        try {
            await Rdv.findByIdAndDelete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

    async findByIdemploye(req, res) {   
        try {
            const rdvs = await Rdv.find({ 'serviceEmpl.employe': req.params.employeId })
            .populate('serviceEmpl.service')
            .populate('serviceEmpl.employe');
            res.status(200).json(rdvs);
        } catch (err) {
            res.status(404).send({ message: err.message });
        }
    }
}
module.exports = new rdvController();