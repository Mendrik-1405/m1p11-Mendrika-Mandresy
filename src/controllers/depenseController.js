const Depense = require('../models/depenseModel');

class depenseController {

    async create(req, res) {
        try {
            const depense = new Depense(req.body);
            await depense.save();
            res.status(201).json(depense);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    async update(req, res) {
        try {
            const depense = await Depense.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(depense);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    async findAll(req, res) {
        try {
            const depenses = await Depense.find({});
            res.status(200).json(depenses);  
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

}

module.exports = new depenseController();