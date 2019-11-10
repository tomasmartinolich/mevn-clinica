const mongoose = require('mongoose');
const { Schema } = mongoose;  

const Consulta = new Schema({
    paciente: Number,
    fConsulta: Date,
    motivo: String,
    enfermedadActual: String,
    antecPersonales: String,
    antecFamiliares: String,
    examenFisico: String,
    conducta: String,
    observaciones: String
})

module.exports = mongoose.model('Consulta', Consulta);