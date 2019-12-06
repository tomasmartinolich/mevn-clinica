const mongoose = require('mongoose');
const { Schema } = mongoose;

const Turno = new Schema({   
    dia: Date,
    hora: Number,
    paciente: String,
    user: String
});

module.exports = mongoose.model('Turnos', Turno);