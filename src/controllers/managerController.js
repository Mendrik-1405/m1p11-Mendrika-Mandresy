const Manager = require('../models/managerModel');

class managerController {

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

}

module.exports = new managerController();