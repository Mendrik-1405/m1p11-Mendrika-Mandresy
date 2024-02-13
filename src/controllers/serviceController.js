const Service = require('../models/serviceModel');

class serviceController {

    async create(req, res) {
        try {
            const service = new Service(req.body);
            await service.save();
            res.status(201).json(service);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    async update(req, res) {
        try {
            const service = await Service.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(service);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    async delete(req, res) {
        try {
            const service = await Service.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(service);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    async findAll(req, res) {
        try {
            const services = await Service.find({});
            res.status(200).json(services);  
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

}

module.exports = new serviceController();