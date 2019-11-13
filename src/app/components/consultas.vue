<template>
    <div>
        <div class="container">
            <div class="row-2 text-center">
                <h1>Historia clínica de {{ $route.params.id }}</h1>
            </div>
            <router-link to="/"><div class="btn btn-secondary">Volver a pacientes</div></router-link>
            <div class="row">
                <div class="col" v-if="formConsulta">
                    <form @submit.prevent="sendConsulta">
                        <div class="row">
                            <div class="form-group col-3">
                                <label for="fConsulta" class="col">Fecha de la consulta</label>
                                <input type="date" v-model="consulta.fConsulta" id="fConsulta" class="col form-control">
                            </div>
                            <div class="form-group col-3">
                                <label for="motivo" class="col">Motivo de la consulta</label>
                                <input type="text" id="motivo" v-model="consulta.motivo" class="form-control">
                            </div>
                            <div class="form-group col-3">
                                <label for="enfActual" class="col">Enfermedad actual</label>
                                <input type="text" id="enfActual" v-model="consulta.enfermedadActual" class="form-control">
                            </div>
                        </div>
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
                    <button class="btn btn-secondary btn-block" @click="formConsulta = !formConsulta">Cancelar</button>
                </div>
            </div>
            <div class="row">
                <div class="col" v-if="!formConsulta">
                    <button type="button" class="btn btn-primary" @click="showFormConsulta">Nueva consulta</button>
                    <table class="table table-bordered table-hover">
                        <thead class="thead-dark">
                            <tr class="text-center">
                                <th>Paciente</th>
                                <th>Fecha de consulta</th>
                                <th>Motivo de consulta</th>
                                <th>Opciones</th>
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
                formConsulta: false,
                paciente: this.$route.params.id
            }
        },
        created() {
            this.getConsultas()
        },
        methods: {
            showFormConsulta(){
                this.edit = false
                this.consulta = new Consulta()
                this.formConsulta = true
            },
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
                        this.consulta = new Consulta(this.paciente, this.fConsulta, this.motivo, this.enfermedadActual, this.antecPersonales, this.antecFamiliares, this.examenFisico, this.conducta, this.observaciones)
                        this.consultaToEdit = data._id
                        this.edit = true
                    })
            }
        }
    }

</script>
