<template>
    <div>
        <div class="container">
            <h4>Historia clínica de {{ $route.params.id }}</h4>
            <div class="row pt-5">
                <div class="col-md-5">
                    <form @submit.prevent="sendConsulta">
                        <label for="fConsulta" class="col">Fecha de la consulta</label>
                        <input type="date" v-model="consulta.fConsulta" id="fConsulta" class="col form-control">
                         <div class="row">
                            <input type="text" v-model="consulta.motivo" placeholder="Motivo de la consulta" class="form-control">
                        </div>
                        <input type="text" v-model="consulta.enfermedadActual" placeholder="Enfermedad actual" class="form-control">
                        <div class="form-group">
                            <label for="antecedentesPersonales">Antecedentes personales</label>
                            <textarea class="form-control" v-model="consulta.antecPersonales" id="antecedentesPersonales" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="antecedentesFamiliares">Antecedentes familiares</label>
                            <textarea class="form-control" v-model="consulta.antecFamiliares" id="antecedentesFamiliares" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="examenFisico">Examen físico</label>
                            <textarea class="form-control" v-model="consulta.examenFisico" id="examenFisic" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="Conducta">Conducta</label>
                            <textarea class="form-control" v-model="consulta.conducta" id="Conducta" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="Observaciones">Observaciones</label>
                            <textarea class="form-control" v-model="consulta.observaciones" id="Observaciones" rows="3"></textarea>
                        </div>
                        <template v-if="edit === false">
                            <button class="btn btn-primary btn-block">Send</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-primary btn-block">Update</button>
                        </template>
                    </form>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Fecha de consulta</th>
                                <th>Motivo de consulta</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr v-for="consulta of consultas">
                                <td>{{$route.params.id}}</td>
                                <td>{{consulta.fConsulta}}</td>
                                <td>{{consulta.motivo}}</td>
                                <td>
                                    <button @click="editConsulta(consulta._id)" class="btn btn-success">
                                        Edit
                                    </button>
                                    <button @click="deleteConsulta(consulta._id)" class="btn btn-danger">
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

    class Consulta {
        constructor(paciente, fConsulta, motivo, enfermedadActual, antecPersonales, antecFamiliares, examenFisico, conducta, observaciones) {
            this.paciente = 0
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
                paciente: this.$route.params.id
            }
        },
        created() {
            this.getConsultas()
        },
        methods: {
            sendConsulta() {
                if(this.edit === false) {
                    fetch('/api/consultas/' + this.paciente, {
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
                    fetch('/api/consultas/' + this.paciente + '/' + this.consultaToEdit, {
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
                fetch('/api/consultas/' + this.paciente)
                    .then(res => res.json())
                    .then(data => {
                        this.consultas = data
                    })
            },
            deleteConsulta(id) {
                fetch('/api/consultas/' + this.paciente + '/' + id, {
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
                fetch('/api/consultas/' + this.paciente + '/' +id)
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
