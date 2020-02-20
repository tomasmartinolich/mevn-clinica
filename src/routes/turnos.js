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

turnos.get('/turno/:id', async (req, res) => {
    const turno = await Turno.findById(req.params.id);
    res.json(turno);
});

turnos.post('/', async (req, res) => {
    let turno = new Turno(req.body);
    await turno.save();
    res.json({
        status: 'Turno guardado'
    });
});    

turnos.put('/:turno', async (req, res) => {
    await Turno.findByIdAndUpdate(req.params.turno, req.body);
    res.json({
        status: 'Turno actualizado'
    });
});

turnos.delete('/:turno', async (req, res) => {
    await Turno.findByIdAndRemove(req.params.turno);
    res.json({
        status: 'Turno eliminado'
    });
});


module.exports = turnos; 