const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({   
    nombre: {
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', User);