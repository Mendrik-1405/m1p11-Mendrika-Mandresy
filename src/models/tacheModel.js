const mongoose = require('../utils/db');
const service = require("./serviceModel");

    tacheSchema = new mongoose.Schema({
        dateheure: Date,
        service: service.Schema,
        client:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employes'
        },
        etat: Number
    })

module.exports = mongoose.model('Tache', tacheSchema);
