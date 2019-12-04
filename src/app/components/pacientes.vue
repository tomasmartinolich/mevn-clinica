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
                            <select id="selectPediatras" v-model="task.pediatra" class="form-control">
                                <option>Juan</option>
                                <option>Carlos</option>
                            </select>
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
                    <button type="button" class="btn btn-primary" @click="showFormPacientes">Nuevo paciente</button>       
                </div>
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
                                <button @click="verPaciente(task._id)" class="btn btn-secondary">
                                    Ver
                                </button>
                                <button @click="editTask(task._id)" class="btn btn-success">
                                    Editar
                                </button>
                                <!--
                                <button @click="deleteTask(task._id)" class="btn btn-danger">
                                    Eliminar
                                </button>
                                -->
                                <router-link :to="{ name: 'paciente', params: {id: task.DNI} }">
                                    <button class="btn btn-info">
                                        Historia clínica
                                    </button>
                                </router-link>
                                <button class="btn btn-warning" @click="getSpecificTask(task._id)">Espera</button>                                   
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
                <div class="form-group col-3">
                    <b>Nombre</b>
                    <input readonly type="text" v-model="task.nombre" class="form-control-plaintext">
                </div>
                <div class="form-group col-3">
                    <b>Apellido</b>
                    <input readonly type="text" v-model="task.apellido" class="form-control-plaintext">
                </div>
                <div class="form-group col-3">
                    <b>DNI</b>
                    <input readonly type="DNI" v-model="task.DNI" class="form-control-plaintext">
                </div>
                <div class="form-group col-3">
                    <b>Fecha de Nacimiento</b>
                    <input readonly type="date" v-model="task.fNacimiento" class="col form-control-plaintext">
                </div>
            </div>
            
            <div class="row">
                <div class="form-group col-3">
                    <b>Localidad</b>
                    <input readonly type="text" v-model="task.localidad" class="form-control-plaintext">
                </div>
                <div class="form-group col-3">
                    <b>Dirección</b>
                    <input readonly type="text" v-model="task.direccion" class="form-control-plaintext">
                </div>
                <div class="form-group col-3">
                    <b>Teléfono</b>
                    <input readonly type="number" v-model="task.telefono" class="form-control-plaintext">
                </div>
                <div class="form-group col-3">
                    <b>Cobertura</b>
                    <input readonly type="text" v-model="task.cobertura" class="form-control col-plaintext">
                </div>
                <div class="form-group col-3">
                    <b>N° Afiliado</b>
                    <input readonly type="text" v-model="task.nAfiliado" class="form-control col-plaintext">
                </div>
                <div class="form-group col-3">
                    <b>Plan</b>
                    <input readonly type="text" v-model="task.plan" class="form-control col-plaintext">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-3">
                    <b>Pediatra</b>
                    <input readonly type="text" v-model="task.pediatra" class="form-control-plaintext">
                </div>
            </div>
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

    class Task {
        constructor(nombre, apellido, cobertura, nAfiliado, plan, antecFamiliares, antecPersonales, pediatra, fNacimiento, DNI, localidad, direccion, telefono) {
            this.nombre = nombre
            this.apellido = apellido
            this.cobertura = cobertura
            this.nAfiliado = nAfiliado
            this.plan = plan
            this.antecFamiliares = antecFamiliares
            this.antecPersonales = antecPersonales
            this.pediatra = pediatra
            this.fNacimiento = fNacimiento
            this.DNI = DNI
            this.localidad = localidad
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
                seccion: 'tabla',
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
                    })
            },
            getSpecificTask(id) {
                fetch('/api/tasks/'+id)
                    .then(res => res.json())
                    .then(data => {
                        this.taskToList = data
                    })
            },
            verPaciente(id){
                fetch('/api/tasks/' +id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.nombre, data.apellido, data.cobertura, data.nAfiliado, data.plan, data.antecFamiliares, data.antecPersonales, data.pediatra, data.fNacimiento, data.DNI, data.localidad, data.direccion, data.telefono)
                        this.seccion = 'vista'
                        console.log("vista trae:")
                        console.log(this.task)
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
                        this.task = new Task(data.nombre, data.apellido, data.cobertura, data.nAfiliado, data.plan, data.antecFamiliares, data.antecPersonales, data.pediatra, data.fNacimiento, data.DNI, data.localidad, data.direccion, data.telefono)
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
