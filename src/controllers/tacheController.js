const Tache = require('../models/tacheModel');


class tacheController {
    async create(req, res) {
        try {
            const tache = new Tache(req.body);
            await tache.save();
            res.status(201).json(tache);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

    async update(req, res) {
        try {
            const tache = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(tache);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

    async findById(req, res) {
        try {
            const tache = await Tache.findById(req.params.id);
            res.status(200).json(tache);
        } catch (err) {
            res.status(404).send({ message: err.message });
        }
    }

    async findAll(req, res) {
        try {
            const taches = await Tache.find({});
            res.status(200).json(taches);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
    
    async delete(req, res) {
        try {
            await Tache.findByIdAndDelete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }

}
module.exports = new tacheController();