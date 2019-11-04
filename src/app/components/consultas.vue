<template>
    <div>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask">
                                <div class="row">
                                    <input type="text" placeholder="Motivo de la consulta" class="form-control">
                                </div>
                                <label for="fConsulta" class="col">Fecha de la consulta</label>
                                <input type="date" id="fConsulta" class="col form-control">
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
                <div v-if="seccion==='probando'" class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Fecha de consulta</th>
                                <th>Motivo de consulta</th>
                            </tr>
                        </thead>
                        <!--
                        <tbody>
                            <tr v-for="consulta of consultas">
                                <td>{{consulta.apellido + " " + task.nombre}}</td>
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
                        </tbody> -->
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    class Consulta {
        constructor(fConsulta, motivo, enfermedadActual, antecPersonales, antecFamiliares, examenFisico, conducta, observaciones) {
            this.fConsulta = fConsulta
            this.motivo = motivo
            this.enfermedadActual = enfermedadActual
            this.antecPersonales = antecPersonales
            this.antecFamiliares = antecFamiliares
            this.examenFisico = examenFisico
            this.conducta = conducta
            this.observaciones = observaciones
        }
    }

    export default {
        name: 'consultas',
        data() {
            return {
                consulta: new Consulta(),
                consultas: [],
                edit: false,
                consultaToEdit: '',
            }
        },
        created() {
            this.getConsultas()
        },
        methods: {
            sendConsulta() {
                if(this.edit === false) {
                    fetch('/api/consultas', {
                        method: 'POST',
                        body: JSON.stringify(this.consulta),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            this.getConsultas()
                        })
                } else {
                    fetch('/api/consultas/' + this.consultaToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.consulta),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getConsultas()
                        this.edit = false
                    })
                }

                this.consulta = new Consulta()
            },
            getConsultas() {
                fetch('/api/consultas')
                    .then(res => res.json())
                    .then(data => {
                        this.consultas = data
                        console.log(this.consultas)
                    })
            },
            deleteTask(id) {
                fetch('/api/consultas/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getConsultas()
                })
            },
            editConsulta(id) {
                fetch('/api/consultas/' +id)
                    .then(res => res.json())
                    .then(data => {
                        this.consulta = new Consulta(this.fConsulta, this.motivo, this.enfermedadActual, this.antecPersonales, this.antecFamiliares, this.examenFisico, this.conducta, this.observaciones)
                        this.consultaToEdit = data._id
                        this.edit = true
                    })
            }
        }
    }

</script>
