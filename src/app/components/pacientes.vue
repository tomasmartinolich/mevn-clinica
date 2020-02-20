<template>
    <div>
            <!-- FORM PACIENTE -->
        <div class="container" v-if="seccion === 'form'">
            <div class="col">
                <form @submit.prevent="sendTask">
                    <div class="row">
                        <div class="form-group col-3">
                            <label for="nombre">Nombre</label>
                            <input type="text" id="nombre" v-model="task.nombre" class="form-control">
                        </div>
                        <div class="form-group col-3">
                            <label for="apellido">Apellido</label>
                            <input type="text" id="apellido" v-model="task.apellido" class="form-control">
                        </div>
                        <div class="form-group col-3">
                            <label for="DNI">DNI</label>
                            <input type="number" id="DNI" v-model="task.DNI" class="form-control">
                        </div>
                        <div class="form-group col-3">
                            <label for="fNacimiento">Fecha de Nacimiento</label>
                            <input type="date" id="fNacimiento" v-model="task.fNacimiento" class="col form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-3">
                            <label for="selectPediatras">Pediatra</label>
                            <input type="text" id="selectPediatras" v-model="task.pediatra" class="form-control">
                        </div>
                    </div>              
                    <div class="row">
                        <div class="form-group col-3">
                            <label for="localidad">Localidad</label>
                            <input type="text" id="localidad" v-model="task.localidad" class="form-control">
                        </div>
                        <div class="form-group col-3">
                            <label for="direccion">Dirección</label>
                            <input type="text" id="direccion" v-model="task.direccion" class="form-control">
                        </div>
                        <div class="form-group col-3">
                            <label for="telefono">Teléfono</label>
                            <input type="number" id="telefono" v-model="task.telefono" class="form-control">
                        </div>   
                    </div>
                    <div class="row">
                        <div class="form-group col-3">
                            <label for="cobertura">Cobertura</label>
                            <input type="text" id="cobertura" v-model="task.cobertura" class="form-control col">
                        </div>
                        <div class="form-group col-3">
                            <label for="nAfiliado">N° Afiliado</label>
                            <input type="number" id="nAfiliado" v-model="task.nAfiliado" class="form-control col">
                        </div>
                        <div class="form-group col-3">
                            <label for="plan">Plan</label>
                            <input type="text" id="plan" v-model="task.plan" class="form-control col">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <b>Antecedentes familiares</b>
                            <textarea class="form-control text-center" v-model="task.antecFamiliares" rows="3"></textarea>
                        </div>
                        <div class="col">
                            <b>Antecedentes personales</b>
                            <textarea class="form-control text-center" v-model="task.antecPersonales" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <b>Observaciones</b>
                        <textarea class="form-control text-center" v-model="task.obser" rows="3"></textarea>
                    </div>
                    <template v-if="edit === false">
                        <button class="btn btn-primary btn-block">Aceptar</button>
                    </template>
                    <template v-else>
                        <button class="btn btn-primary btn-block">Actualizar</button>
                    </template>        
                </form>
                <button class="btn btn-secondary btn-block" @click="seccion = 'tabla'">Cancelar</button>
            </div>
        </div>

            <!-- TABLA PACIENTES -->
        <div class="container" v-if="seccion === 'tabla'">
            <div class="col">
                <div class="row py-md-2 px-md-2">    
                    <button type="button" class="btn btn-primary col-2" @click="showFormPacientes">Nuevo paciente</button>    
                    <div class="col-4"></div>
                    <input type="text" v-model="filtro" placeholder="Buscar paciente..." class="col-2 form-control mr-sm-2">   
                </div>
                <table class="table table-bordered table-hover">
                    <thead class="thead-dark">
                        <tr class="text-center">
                            <th>Paciente</th>
                            <th>Edad</th>
                            <th>Pediatra</th>
                            <th>Localidad</th>
                            <th>Teléfono</th>
                            <th>DNI</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task of tasks" v-if="task.apellido.toLowerCase().includes(filtro.toLowerCase()) || task.nombre.toLowerCase().includes(filtro.toLowerCase())">
                            <td>{{task.apellido + " " + task.nombre}}</td>
                            <td>{{task.fNacimiento}}</td>
                            <td>{{task.pediatra}}</td>
                            <td>{{task.localidad}}</td>
                            <td>{{task.telefono}}</td>
                            <td>{{task.DNI}}</td>
                            <td>
                                <button @click="verPaciente(task._id, 'vista')" class="btn btn-secondary btn-sm">
                                    Ver
                                </button>
                                <button @click="editTask(task._id)" class="btn btn-success btn-sm">
                                    Editar
                                </button>
                                <!--
                                <button @click="deleteTask(task._id)" class="btn btn-danger">
                                    Eliminar
                                </button>
                                -->
                                <router-link :to="{ name: 'paciente', params: {id: task.DNI} }">
                                    <button class="btn btn-info btn-sm">
                                        Historia clínica
                                    </button>
                                </router-link>
                                <button @click="verPaciente(task._id, 'ficha')" class="btn btn-info btn-sm">
                                    Ficha
                                </button>
                                <button class="btn btn-warning btn-sm" @click="getSpecificTask(task._id)">Espera</button>                                   
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

            <!-- VISTA PACIENTE -->
        <div class="container" v-if="seccion === 'vista'">
            <button type="button" class="btn btn-dark" @click="seccion = 'tabla'">Volver</button>
            <div class="row">
                <div class="form-group col-4">
                    <b>Paciente:</b>
                    <span>{{task.apellido + " " + task.nombre}}</span><br>
                    <b>Edad:</b>
                    <span>{{task.fNacimiento}}</span><br>
                    <b>DNI:</b>
                    <span>{{task.DNI}}</span><br>
                </div>
            </div>
            
            <div class="row">
                <div class="form-group col-3">
                    <b>Localidad:</b>
                    <span>{{task.localidad}}</span><br>   
                    <b>Dirección:</b>
                    <span>{{task.direccion}}</span><br>
                    <b>Teléfono:</b>
                    <span>{{task.telefono}}</span><br>
                    <b>Cobertura:</b>
                    <span>{{task.cobertura}}</span><br>
                    <b>N° Afiliado:</b>
                    <span>{{task.nAfiliado}}</span><br>
                    <b>Plan:</b>
                    <span>{{task.plan}}</span><br>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-3">
                    <b>Pediatra</b>
                    <span>{{task.pediatra}}</span><br>
                </div>
            </div>
            <div class="row">
                <b>Observaciones:</b>
                <span>{{task.obser}}</span><br>
            </div>
            
        </div>

            <!-- VISTA FICHA PACIENTE -->
        <div class="container" v-if="seccion === 'ficha'">
            <button type="button" class="btn btn-dark" @click="seccion = 'tabla'">Volver</button>
            <div class="row">
                <div class="form-group col-3">
                    <b>Antecedentes Familiares</b>
                    <textarea readonly v-model="task.antecFamiliares" rows="3" class="form-control-plaintext"></textarea>
                </div>
                <div class="form-group col-3">
                    <b>Antecedentes Personales</b>
                    <textarea readonly v-model="task.antecPersonales" rows="3" class="form-control-plaintext"></textarea>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
var moment = require('moment');
import io from 'socket.io-client';
    class Task {
        constructor(nombre, apellido, cobertura, nAfiliado, plan, antecFamiliares, antecPersonales, pediatra, fNacimiento, DNI, localidad, direccion, telefono, obser) {
            this.nombre = nombre
            this.apellido = apellido
            this.cobertura = cobertura
            this.nAfiliado = nAfiliado
            this.plan = plan
            this.antecFamiliares = antecFamiliares
            this.antecPersonales = antecPersonales
            this.pediatra = pediatra
            this.fNacimiento = new Date(fNacimiento)
            this.DNI = DNI
            this.localidad = localidad
            this.direccion = direccion
            this.telefono = telefono
            this.salaEspera = false
            this.obser = obser
        }
    }

    export default {
        name: 'pacientes',
 //       props: ['listaEspera'],
        data() {
            return {
                filtro: '',
                user: {
                    "email": "",
                    "nombre": "",
                    "apellido": ""
                },
                socket : io('localhost:3000'),
                task: new Task(),
                tasks: [],
                taskToList: [],
                edit: false,
                taskToEdit: '',
                seccion: 'tabla',
                probandoListaEspera: []
            }
        },
        created() {
            if (localStorage.getItem('token') === null) {
                this.$router.push('/login')
            }
            this.getTasks()
        },
        methods: {
            getEdad(FNAC){
                var today = new Date();
                var birthDate = new Date(FNAC);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age = age - 1;
                }
                return age;
                //alert(getEdad("12/21/1993"));
            },
            getfNacimiento(){
               // this.task.fNacimiento = moment().format(moment.HTML5_FMT.DATE)
                let fNac = new Date(this.task.fNacimiento)
                let fNacDia = fNac.getDate() +1
                let fNacMes = (fNac.getMonth() + 1)
                let fNacAnio = fNac.getFullYear()
                let fNac2 = fNacMes.toString() + "/" + fNacDia.toString() + "/" + fNacAnio.toString()
                this.task.fNacimiento = this.getEdad(fNac2) + " (" + fNacDia + "/" + fNacMes + "/" + fNacAnio + ")"
            },
            showFormPacientes(){
                this.edit = false
                this.task = new Task()
                this.seccion = 'form'
            },
            sendTask() {
                if(this.edit === false) {
                    fetch('/api/tasks', {
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            this.getTasks()
                        })
                } else {
                    fetch('/api/tasks/' + this.taskToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks()
                        this.edit = false
                    })
                }

                this.task = new Task()
                this.seccion = 'tabla'
            },
            getTasks() {
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data
                        this.tasks.forEach(this.nacimientos)
                        
                    })
            },
            nacimientos(task,index){
                this.task = this.tasks[index]
                this.getfNacimiento()
                this.task.fNacimiento.slice(0,3)
            },
            getSpecificTask(id) {
                fetch('/api/tasks/'+id)
                    .then(res => res.json())
                    .then(data => {
                        this.taskToList = data
                    })
            },
            verPaciente(id, seccion){
                fetch('/api/tasks/' +id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.nombre, data.apellido, data.cobertura, data.nAfiliado, data.plan, data.antecFamiliares, data.antecPersonales, data.pediatra, data.fNacimiento, data.DNI, data.localidad, data.direccion, data.telefono, data.obser)
                        this.seccion = seccion
                        this.getfNacimiento()
                    })
            },
            /*
            deleteTask(id) {
                fetch('/api/tasks/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks()
                })
            },*/
            editTask(id) {
                this.seccion = 'form'
                fetch('/api/tasks/' +id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.nombre, data.apellido, data.cobertura, data.nAfiliado, data.plan, data.antecFamiliares, data.antecPersonales, data.pediatra, data.fNacimiento, data.DNI, data.localidad, data.direccion, data.telefono, data.obser)
                        this.taskToEdit = data._id
                        this.edit = true
                    })
            }
        }, watch: {
            taskToList: function(){
                if (!Array.isArray(this.taskToList)) {
                    this.taskToList.salaEspera = true
                    fetch('/api/tasks/' + this.taskToList._id, {
                            method: 'PUT',
                            body: JSON.stringify(this.taskToList),
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            }
                        })
                        .then(res => res.json())
                        .then(this.socket.emit('agregarPaciente', this.taskToList))
                        .then(this.taskToList = [])
                        /* .then(data => {
                            this.getTasks()
                            this.edit = false
                        })*/
                }
            }
        }
    }

</script>
