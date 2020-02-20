const mongoose = require('mongoose');
const { Schema } = mongoose;  

const Consulta = new Schema({
    paciente: Number,
    fConsulta: Date,
    motivo: String,
    enfermedadActual: String,
    examenFisico: String,
    conducta: String,
    observaciones: String,
    username: String,
    espec: String,
    matriculas: String
})

module.exports = mongoose.model('Consulta', Consulta);