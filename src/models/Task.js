const mongoose = require('mongoose');
const { Schema } = mongoose;        //esto le dice que solo requiere la parte de "Schema" de mongoose

const Task = new Schema({        //este esquema dice a mongo cómo van a lucir los datos
    nombre: String,
    apellido: String,
    cobertura: String,
    pediatra: String,
    fNacimiento: Date,
    DNI: Number,
    direccion: String,
    telefono: Number
});


/*
const Consulta = new Schema({
    fConsulta: Date,
    motivo: String,
    enfermedadActual: String,
    antecPersonales: String,
    antecFamiliares: String,
    examenFisico: String,
    conducta: String,
    observaciones: String
})*/

module.exports = mongoose.model('Task', Task);
//module.exports = mongoose.model('Consulta', Consulta);