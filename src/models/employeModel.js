const mongoose = require('../utils/db');

    employeSchema = new mongoose.Schema({
        name: String,
        password: String,
        phone: String,
        sexe: String,
        photo: String,
        services: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }],
        taches: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tache'
        }],
        horaire:{
            debut:Date,
            fin:Date
        }
    })


module.exports =mongoose.model('Employe', employeSchema);