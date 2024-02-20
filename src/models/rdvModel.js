const mongoose = require('../utils/db');

    rdvSchema = new mongoose.Schema({
        dateheure: Date,
        serviceEmpl: [{
            service: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service',
            },
            employe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Employe',
            }
        }]
    })

module.exports = mongoose.model('Rdv', rdvSchema);
