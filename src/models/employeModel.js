const mongoose = require('../utils/db');
const service = require("./serviceModel");
const tache = require("./tacheModel");

    employeSchema = new mongoose.Schema({
        nom: String,
        email: String,
        password: String,
        phone: String,
        sexe: String,
        photo: String,
        services:[service.schema],
        taches:[tache.schema],
        horaire:{
            debut:Date,
            fin:Date
        }
    })


module.exports =mongoose.model('Employe', employeSchema);