const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({   
    nombre: {
        type: String,
        required: false
    },
    apellido:{
        type: String,
        required: false
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    especialidad: {
        type: String,
        required: true,
        unique: false
    },
    matnac: {
        type: Number,
        required: false,
        unique: false
    },
    matprov: {
        type: Number,
        required: false,
        unique: false
    },
    pass: {
        type: String,
        required: true
    },
    admin: Boolean,
    turnos: Boolean,
    pending: Boolean
});

module.exports = mongoose.model('User', User);