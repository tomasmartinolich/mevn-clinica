const mongoose = require('mongoose');
const { Schema } = mongoose;

const Turno = new Schema({   
    dia: Number,
    mes: Number,
    anio: Number,
    hora: Number,
    descripcion: String,
    user: String
});

module.exports = mongoose.model('Turnos', Turno);