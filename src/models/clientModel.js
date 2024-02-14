const mongoose = require('../utils/db');

    clientSchema = new mongoose.Schema({
        nom: String,
        email: String,
        password: String,
        phone: String,
        rendezVous: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RendezVous'
        }],
        servicesPref: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Services'
        }],
        employesPref: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employes'
        }],
        porteFeuille: Number
    })

module.exports =mongoose.model('Client', clientSchema);