const mongoose = require('../utils/db');

    serviceSchema = new mongoose.Schema({
        nom: String,
        prix: Number,
        duree: Number,
        commission: Number,
        photo: String,
        etat: Number
    })

module.exports = mongoose.model('Service', serviceSchema);
