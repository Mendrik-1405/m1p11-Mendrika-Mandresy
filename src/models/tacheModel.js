const mongoose = require('../utils/db');
const service = require("./serviceModel");

    tacheSchema = new mongoose.Schema({
        dateheure: Date,
        service: service.schema,
        client:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employe'
        },
        etat: Number
    })

module.exports = mongoose.model('Tache', tacheSchema);
