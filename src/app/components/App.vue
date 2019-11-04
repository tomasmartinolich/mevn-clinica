<template>
<div>

    <nav class="navbar navbar-light bg-light">
        <a href="/" class="navbar-brand">CEDYT</a>
    </nav>

    <div class="container">
        <div class="row pt-5">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="sendTask">
                            <div class="row">
                                <div class="col">
                                  <input type="text" v-model="task.nombre" placeholder="Nombre" class="form-control">
                                </div>
                                <div class="col">
                                    <input type="text" v-model="task.apellido" placeholder="Apellido" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="number" placeholder="DNI" v-model="task.DNI" class="form-control">
                            </div>
                            <label for="fNacimiento" class="col">Fecha de Nacimiento</label>
                            <input type="date" id="fNacimiento" v-model="task.fNacimiento" class="col form-control">
                            <input type="text" placeholder="Cobertura" v-model="task.cobertura" class="form-control col">
                            <label for="selectPediatras">Pediatra</label>
                            <select id="selectPediatras" v-model="task.pediatra" class="form-control">
                                <option>Cachito</option>
                                <option>Ernesto</option>
                            </select>
                            <input type="text" placeholder="Dirección" v-model="task.direccion" class="form-control">
                            <input type="number" placeholder="Teléfono" v-model="task.telefono" class="form-control">
                            <template v-if="edit === false">
                                <button class="btn btn-primary btn-block">Send</button>
                            </template>
                            <template v-else>
                                <button class="btn btn-primary btn-block">Update</button>
                            </template>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>DNI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task of tasks">
                            <td>{{task.apellido + " " + task.nombre}}</td>
                            <td>{{task.DNI}}</td>
                            <td>
                                <button @click="editTask(task._id)" class="btn btn-success">
                                    Edit
                                </button>
                                <button @click="deleteTask(task._id)" class="btn btn-danger">
                                    Delete
                                </button>
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
        }
    }

    export default {
        data() {
            return {
                task: new Task(),
                tasks: [],
                edit: false,
                taskToEdit: ''
            }
        },
        created() {
            this.getTasks()
        },
        methods: {
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
            },
            getTasks() {
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data
                        console.log(this.tasks)
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
                fetch('/api/tasks/' +id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.nombre, data.apellido, data.cobertura, data.pediatra, data.fNacimiento, data.DNI, data.direccion, data.telefono)
                        this.taskToEdit = data._id
                        this.edit = true
                    })
            }
        }
    }

</script>
