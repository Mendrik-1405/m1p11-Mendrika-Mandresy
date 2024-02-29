const mongoose = require('../utils/db');

    depenseSchema = new mongoose.Schema({
        type: String,
        montant: Number,
        date: Date
    })

module.exports = mongoose.model('Depense', depenseSchema);
