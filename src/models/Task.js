const mongoose = require('mongoose');
const { Schema } = mongoose;        //esto le dice que solo requiere la parte de "Schema" de mongoose

const Task = new Schema({        //este esquema dice a mongo cómo van a lucir los datos
    nombre: String,
    apellido: String,
    cobertura: String,
    nAfiliado: Number,
    plan: String,
    antecFamiliares: String,
    antecPersonales: String,
    pediatra: String,
    fNacimiento: Date,
    DNI: Number,
    localidad: String,
    direccion: String,
    telefono: Number,
    salaEspera: Boolean,
    obser: String
});

module.exports = mongoose.model('Task', Task);