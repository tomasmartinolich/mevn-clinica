//acá se colocan las URLs de nuestra REST API o las URLs de todas las operaciones que puede hacer el servidor
//cuando entra a una URL puede hacer cosas con los datos que tiene en el servidor
//Este archivo devuelve un objeto
const express = require('express');
const router = express.Router();  //crea un objeto para que uno pueda definir rutas

const Task = require('../models/Task');     //requiere el modelo Task

//recibir datos
router.get('/', async (req, res) => {       //se pone async para poder usar await abajo (espera a que termine la consulta para almacenarla en la constante)
    //find hace una consulta a la BD. Es como un select de SQL. Por defecto busca todos los datos
    const tasks = await Task.find();   
    res.json(tasks);   
});

//busca un doc. por id
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});


//las rutas post son para que el navegador pueda enviar peticiones al servidor y el servidor los tome y almacene
//almacenar datos
router.post('/', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json({
        status: 'Task saved'
    });
});      

//actualizar datos
router.put('/:id', async (req, res) => {
    //req.params trae parametros en la url
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Task updated'
    });
});

//eliminar datos
/*
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Task removed'
    });
});
*/

module.exports = router;        //se exporta para poder usarlo en otras partes de la aplicación
