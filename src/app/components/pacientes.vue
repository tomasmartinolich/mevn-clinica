<template>
    <div>
        <div class="container">

            <div class="row">
                <div class="col" v-if="formPaciente">
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
                                <input type="DNI" id="DNI" v-model="task.DNI" class="form-control">
                            </div>
                            <div class="form-group col-3">
                                <label for="fNacimiento">Fecha de Nacimiento</label>
                                <input type="date" id="fNacimiento" v-model="task.fNacimiento" class="col form-control">
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="form-group col-3">
                                <label for="direccion">Dirección</label>
                                <input type="text" id="direccion" v-model="task.direccion" class="form-control">
                            </div>
                            <div class="form-group col-3">
                                <label for="telefono">Teléfono</label>
                                <input type="number" id="telefono" v-model="task.telefono" class="form-control">
                            </div>
                            <div class="form-group col-3">
                                <label for="cobertura">Cobertura</label>
                                <input type="text" id="cobertura" v-model="task.cobertura" class="form-control col">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-3">
                                <label for="selectPediatras">Pediatra</label>
                                <select id="selectPediatras" v-model="task.pediatra" class="form-control">
                                    <option>Juan</option>
                                    <option>Carlos</option>
                                </select>
                            </div>
                        </div>
                        
                        <template v-if="edit === false">
                            <button class="btn btn-primary btn-block">Aceptar</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-primary btn-block">Actualizar</button>
                        </template>    
                        
                    </form>
                        <button class="btn btn-secondary btn-block" @click="formPaciente = !formPaciente">Cancelar</button>
                </div>

                <!-- TABLA PACIENTES -->
                <div class="col" v-if="!formPaciente">
                    <button type="button" class="btn btn-primary" @click="showFormPacientes">Nuevo paciente</button>
                    <table class="table table-bordered table-hover">
                        <thead class="thead-dark">
                            <tr class="text-center">
                                <th>Paciente</th>
                                <th>DNI</th>
                                <th>Pediatra</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks">
                                <td>{{task.apellido + " " + task.nombre}}</td>
                                <td>{{task.DNI}}</td>
                                <td>{{task.pediatra}}</td>
                                <td>{{task.direccion}}</td>
                                <td>{{task.telefono}}</td>
                                <td>
                                    <button @click="editTask(task._id)" class="btn btn-success">
                                        Editar
                                    </button>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">
                                        Eliminar
                                    </button>
                                    <router-link :to="{ name: 'paciente', params: {id: task.DNI} }">
                                        <button class="btn btn-info">
                                          Historia clínica
                                        </button>
                                    </router-link>
                                    <button @click="getSpecificTask(task._id)">Espera</button>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    class Task {
        constructor(nombre, apellido, cobertura, pediatra, fNacimiento, DNI, direccion, telefono) {
            this.nombre = nombre
            this.apellido = apellido
            this.cobertura = cobertura
            this.pediatra = pediatra
            this.fNacimiento = fNacimiento
            this.DNI = DNI
            this.direccion = direccion
            this.telefono = telefono
            this.salaEspera = false
        }
    }

    export default {
        name: 'pacientes',
 //       props: ['listaEspera'],
        data() {
            return {
                task: new Task(),
                tasks: [],
                taskToList: [],
                edit: false,
                taskToEdit: '',
                formPaciente: false,
                probandoListaEspera: []
            }
        },
        created() {
            this.getTasks()
        },
        methods: {
            showFormPacientes(){
                this.edit = false
                this.task = new Task()
                this.formPaciente = true
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
                this.formPaciente = false
            },
            getTasks() {
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data
                    })
            },
            getSpecificTask(id) {
                fetch('/api/tasks/'+id)
                    .then(res => res.json())
                    .then(data => {
                        this.taskToList = data
                    })
            },
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
            },
            editTask(id) {
                this.formPaciente = true
                fetch('/api/tasks/' +id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.nombre, data.apellido, data.cobertura, data.pediatra, data.fNacimiento, data.DNI, data.direccion, data.telefono)
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
