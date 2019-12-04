const express = require('express');
const users = express.Router(); 
const User = require('../models/User'); 

users.post('/registro', (req, res) => {
    const userData = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        pass: req.body.pass
    }

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (!user) {
            User.create(userData)
            .then(user => {
                res.json({status: user.email + 'Registrado!'})
            })
            .catch(err =>{
                res.send('error: ' + err)
            })
        }else{
            res.json({error: 'Ese usuario ya existe.'})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
});

users.post('/login', (req, res) => {
    const userData = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        pass: req.body.pass
    }

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (user) {

        }else{
            res.json('El usuario o la contraseñas son incorrectos')
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
});

module.exports = users; 