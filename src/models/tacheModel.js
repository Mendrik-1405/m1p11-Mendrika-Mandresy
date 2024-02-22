const mongoose = require('../utils/db');
const service = require("./serviceModel");

    tacheSchema = new mongoose.Schema({
        dateheure: Date,
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        },
        client:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employe'
        },
        etat: Number
    })

module.exports = mongoose.model('Tache', tacheSchema);
