const express = require('express');
const mongoose = require('mongoose');
const users = express.Router(); 
const User = require('../models/User'); 
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

users.post('/registro', async (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Ya existe un usuario con ese email.'
            })
        } else {
            bcrypt.hash(req.body.pass, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        email: req.body.email,
                        pass: hash
                    });
                    user.save().then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: 'Usuario creado.'
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            })
        }
    })
    
});    

users.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Autenticación fallida'
            });
        }
        bcrypt.compare(req.body.pass, user.pass, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'Autenticación fallida'
                });
            }
            if(result){
                const token = jwt.sign({
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                    userId: user._id
                }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "24h"
                    }
                );
                return res.status(200).json({
                    message: 'Autenticación exitosa.',
                    status: 200,
                    token: token
                })
            } else {
                return res.status(401).json({
                    message: 'Autenticación fallida'
                });
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

users.get('/profile', (req, res, next) => {
    let token = req.headers.token;
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(401).json({
          title: 'Sin autorización'  
        })
        //token es válido
        User.findOne({_id: decoded.userId}, (err, user) =>{
            if(err) return console.log(err)
            return res.status(200).json({
                title: 'Usuario obtenido',
                user: {
                    email: user.email,
                    nombre: user.nombre,
                    apellido: user.apellido
                }
            })
        })
    })
});



/*
users.get('/', async (req, res) => {
    const users = await User.find().select('nombre apellido');   
    res.json(users);   
});
*/

/*
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
*/

module.exports = users; 