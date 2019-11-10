const express = require('express');
const router = express.Router(); 

const Consulta = require('../models/Consulta'); 

//recibir datos
router.get('/', async (req, res) => {  
    const consultas = await Consulta.find();   
    res.json(consultas);   
});

//busca un doc. por id
router.get('/:id', async (req, res) => {
    const consulta = await Consulta.find({'paciente': req.params.id});
    res.json(consulta);
});

//las rutas post son para que el navegador pueda enviar peticiones al servidor y el servidor los tome y almacene
//almacenar datos
router.post('/:paciente', async (req, res) => {
    let consulta = new Consulta(req.body);
    consulta.paciente = req.params.paciente;
    await consulta.save();
    res.json({
        status: 'Task saved'
    });
});      

//actualizar datos
router.put('/:paciente/:id', async (req, res) => {
    await Consulta.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Consulta updated'
    });
});

//eliminar datos
router.delete('/:paciente/:id', async (req, res) => {
    await Consulta.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Consulta removed'
    });
});

module.exports = router;        //se exporta para poder usarlo en otras partes de la aplicación