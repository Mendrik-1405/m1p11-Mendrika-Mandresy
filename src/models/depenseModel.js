const mongoose = require('../utils/db');

    depenseSchema = new mongoose.Schema({
        type: String,
        prix: Number,
        date: Date
    })

module.exports = mongoose.model('Depense', depenseSchema);
