const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//LISTA DE ESPERA

//recibir todos los pacientes que estén en la lista de espera
router.get('/', async (req, res) => {
    const tasks = await Task.find({'salaEspera':true});   
    res.json(tasks);
});

//Quitar de la lista de espera
router.put('/:id', async (req, res) => {
    req.body.salaEspera = false;
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Quitado de la lista de espera'
    });
});


module.exports = router;  