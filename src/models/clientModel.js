const mongoose = require('../utils/db');
const service = require("./serviceModel");
const rdv = require("./rdvModel");
const employe = require("./employeModel");

    clientSchema = new mongoose.Schema({
        nom: String,
        email: String,
        password: String,
        phone: String,
        rendezVous: [rdv.schema],
        servicePref: [service.schema],
        employePref: [employe.schema],
        porteFeuille: Number
    })

module.exports =mongoose.model('Client', clientSchema);