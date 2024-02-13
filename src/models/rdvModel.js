const mongoose = require('../utils/db');

    rdvSchema = new mongoose.Schema({
        dateheure: Date,
        serviceEmpl: [{
            service: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Services',
            },
            employe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Employes',
            }
        }]
    })

module.exports = mongoose.model('Rdv', rdvSchema);
