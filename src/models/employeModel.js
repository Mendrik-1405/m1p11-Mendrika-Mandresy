const mongoose = require('../utils/db');

    employeSchema = new mongoose.Schema({
        name: String,
        password: String,
        role: String,
        phone: String
    })


module.exports =mongoose.model('Employe', employeSchema);