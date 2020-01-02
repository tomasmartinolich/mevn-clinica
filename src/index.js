const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000)

io.on('connection', function (socket) {
    // socket.emit('actualizarLista', { hello: 'world' });
    
    socket.on('quitarPaciente', function(data){
        io.emit('quitarDeLista', data);
    });

    socket.on('agregarPaciente', function(data){
        io.emit('agregarALista', data);
    });
})




mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log("DB is connected."))
    .catch(err => console.error(err));

//Settings
app.set('port', process.env.PORT || 3000);      // process.env.PORT sirve para que tome el puerto que te da el sist. operativo. Si no hay, que use 3000

//Middlewares                   (funciones que se ejecutan antes de que entren a las rutas)
app.use(morgan('dev'));         //cuando recibas peticiones del navegador en el servidor, el servidor te pueda mostrar qué peticiones ha pedido el navegador
app.use(express.json());        //cada vez que recibimos un json del navegador, el servidor lo puede entender y lo obtiene como objeto

//Routes
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/listaEspera', require('./routes/listaEspera'));
app.use('/api/consultas', require('./routes/consultas'));
app.use('/api/users', require('./routes/users'));
app.use('/api/turnos', require('./routes/turnos'))

//Static files (maneras de enviar archivos al frontend/navegador) (sería lo de la carpeta public)
app.use(express.static(__dirname + '/public'));         // __dirname te tira la dirección exacta donde está este archivo

//Server is listening
/*
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
*/