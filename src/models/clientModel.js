const mongoose = require('../utils/db');

    clientSchema = new mongoose.Schema({
        nom: String,
        email: String,
        password: String,
        phone: String,
        rendezVous: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rdv'
        }],
        servicesPref: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }],
        employesPref: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employe'
        }],
        porteFeuille: Number
    })

module.exports =mongoose.model('Client', clientSchema);