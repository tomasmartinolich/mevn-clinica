const express = require('express');
const turnos = express.Router(); 
const Turno = require('../models/Turnos'); 

turnos.get('/:user/:dia/:mes/:anio', async (req, res) => {
    const turno = await Turno.find({
        'user': req.params.user, 
        'dia': req.params.dia, 
        'mes': req.params.mes,
        'anio': req.params.anio});
    res.json(turno);
});

turnos.get('/:user', async (req, res) => {
    const turno = await Turno.find({'user': req.params.user});
    res.json(turno);
});

turnos.post('/', async (req, res) => {
    let turno = new Turno(req.body);
    await turno.save();
    res.json({
        status: 'Turno guardado'
    });
});    


module.exports = turnos; 