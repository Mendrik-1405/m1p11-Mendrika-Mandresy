const mongoose = require('../utils/db');

    managerSchema = new mongoose.Schema({
        nom: String,
        email: String,
        password: String,
        photo: String
    })

module.exports =mongoose.model('Manager', managerSchema);