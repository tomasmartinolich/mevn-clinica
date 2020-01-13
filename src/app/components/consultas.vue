<template>
    <div>
        <div class="container">
            <div class="row-2 text-center">
                <h1>Historia clínica de {{ paciente.apellido + " " + paciente.nombre }}</h1>
            </div>
            
                            <!-- FORMULARIO DE CONSULTA -->
            <div class="row" v-if="seccion === 'form'">
                <div class="col">
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
                        <!--
                        <div class="form-group">
                            <label for="antecedentesPersonales">Antecedentes personales</label>
                            <textarea class="form-control" v-model="consulta.antecPersonales" id="antecedentesPersonales" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="antecedentesFamiliares">Antecedentes familiares</label>
                            <textarea class="form-control" v-model="consulta.antecFamiliares" id="antecedentesFamiliares" rows="3"></textarea>
                        </div>
                        -->
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
                            <button class="btn btn-primary btn-block">Aceptar</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-primary btn-block">Actualizar</button>
                        </template>
                    </form>
                    <button class="btn btn-secondary btn-block" @click="seccion = 'tabla'">Cancelar</button>
                </div>
            </div>

                        <!-- TABLA DE CONSULTAS -->
            <div class="row" v-if="seccion === 'tabla'">
                <div class="col">
                    <button type="button" class="btn btn-primary" @click="seccion = 'form'">Nueva consulta</button>
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
                                <td>{{paciente.apellido + " " + paciente.nombre}}</td>
                                <td>{{consulta.fConsulta}}</td>
                                <td>{{consulta.motivo}}</td>
                                <td>
                                    <button @click="verConsulta(consulta._id)" class="btn btn-primary">
                                        Ver
                                    </button>
                                    <!--
                                    <button @click="editConsulta(consulta._id)" class="btn btn-success">
                                        Editar
                                    </button>
                                    <button @click="deleteConsulta(consulta._id)" class="btn btn-danger">
                                        Eliminar
                                    </button>
                                    -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- VISTA DE CONSULTA -->
            <div class="container col-8 overflow-auto text-center" v-if="seccion === 'vista'">
                <div class="btn btn-secondary" @click="seccion = 'tabla'">Volver</div>
                <div class="row py-md-3">
                    <div class="col">
                        <b>Fecha de la consulta</b>
                        <input readonly type="date" v-model="consulta.fConsulta" class="col form-control-plaintext text-center">
                    </div>
                    <div class="col">
                        <b>Motivo de la consulta</b>
                    <input readonly type="text" v-model="consulta.motivo" class="form-control-plaintext text-center">
                    </div>
                    <div class="col">
                    <b>Enfermedad actual</b>
                    <input readonly type="text" v-model="consulta.enfermedadActual" class="form-control-plaintext text-center">
                    </div>
                </div>
                <div class="row py-md-3">
                    <div class="col">
                        <b>Antecedentes personales</b>
                        <textarea readonly class="form-control text-center" v-model="paciente.antecPersonales" rows="3"></textarea>
                    </div>
                    <div class="col">
                        <b>Antecedentes familiares</b>
                        <textarea readonly class="form-control text-center" v-model="paciente.antecFamiliares" rows="3"></textarea>
                    </div>
                </div>
                <div class="row py-md-3">
                    <div class="col">
                        <b>Examen físico</b>
                        <textarea readonly class="form-control text-center" v-model="consulta.examenFisico" rows="3"></textarea>
                    </div>
                    <div class="col">
                        <b>Conducta</b>
                        <textarea readonly class="form-control text-center" v-model="consulta.conducta" rows="3"></textarea>
                    </div>
                </div>  
                <div class="row py-md-3">
                  <b>Observaciones</b>
                  <textarea readonly class="form-control text-center" v-model="consulta.observaciones" rows="3"></textarea>  
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    class Consulta {
        constructor(paciente, fConsulta, motivo, enfermedadActual, examenFisico, conducta, observaciones) {
            this.paciente = 0
            this.fConsulta = fConsulta
            this.motivo = motivo
            this.enfermedadActual = enfermedadActual
            this.examenFisico = examenFisico
            this.conducta = conducta
            this.observaciones = observaciones
        }
    }

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
        name: 'consultas',
        data() {
            return {
                consulta: new Consulta(),
                consultas: [],
                edit: false,
                consultaToEdit: '',
                pacienteDNI: this.$route.params.id,
                paciente: new Task(),
                seccion: 'tabla'
            }
        },
        created() {
            if (localStorage.getItem('token') === null) {
                this.$router.push('/login')
            }
            this.getPaciente(this.pacienteDNI)
        },
        methods: {
            getPaciente(id) {
                console.log("id de paciente:")
                console.log(id)
                fetch('/api/consultas/getPaciente/' +id)
                .then(res => res.json())
                .then(data => {
                    this.paciente = data
                })
                .then(this.getConsultas())
            },
            showFormConsulta(){
                this.seccion = 'tabla'
                this.edit = false
                this.consulta = new Consulta()
                this.formConsulta = true
            },
            sendConsulta() {
                this.consulta.paciente = this.pacienteDNI
                if(this.edit === false) {
                    fetch('/api/consultas/' + this.pacienteDNI, {
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
                    fetch('/api/consultas/' + this.pacienteDNI + '/' + this.consultaToEdit, {
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
                this.seccion = 'tabla'
            },
            getConsultas() {
                fetch('/api/consultas/' + this.pacienteDNI)
                    .then(res => res.json())
                    .then(data => {
                        this.consultas = data
                    })
            },
            verConsulta(id){
                fetch('/api/consultas/consulta/' +id)
                .then(res => res.json())
                .then(data => {
                    this.consulta = new Consulta(data.paciente, data.fConsulta, data.motivo, data.enfermedadActual, data.examenFisico, data.conducta, data.observaciones)
                })  
                this.seccion = 'vista'
            },
            deleteConsulta(id) {
                fetch('/api/consultas/' + this.pacienteDNI + '/' + id, {
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
                this.seccion = 'form'
                fetch('/api/consultas/consulta/' +id)
                    .then(res => res.json())
                    .then(data => {
                        this.consulta = new Consulta(data.paciente, data.fConsulta, data.motivo, data.enfermedadActual, data.examenFisico, data.conducta, data.observaciones)
                        this.consultaToEdit = data._id
                        this.edit = true
                    })
            }
        }
    }

</script>
