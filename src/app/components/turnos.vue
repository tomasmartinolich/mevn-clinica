<template>
<div>

<!--
    <select id="selectPediatras" v-model="userSelect" class="form-control" @change="changeUser">
        <option v-for="user of users">{{user.nombre + " " + user.apellido}}</option>
    </select>
-->

    <h4>{{ usuario.nombre + " " + usuario.apellido}}</h4>

    <div>
        <datepicker 
            placeholder="Seleccionar fecha" 
            :inline="true"
            v-model="fecha"
            :language="es"
            :format="formato"
            :highlighted="state.highlighted"
        >
        </datepicker> 
    </div>

    <div v-if="seccion === 'tabla'">
        <button class="btn btn-primary" @click="seccion = 'form'">Nuevo turno</button>
        <table class="table table-bordered table-hover">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th>Hora</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="turno of turnosDia">
                    <td>{{turno.hora}}:{{turno.min}}<span v-if="turno.min === 0">0</span></td>
                    <td>{{turno.descripcion}}</td>
                    <td><button @click="editON(turno._id)" class="btn btn-success">
                        Editar
                    </button>
                    <button @click="eliminarTurno(turno._id)" class="btn btn-danger">
                        Eliminar
                    </button></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="seccion === 'form'">
        <form @submit.prevent="newTurno">
            <div class="form-group col-3">
                <label for="horaTurno" class="col">Seleccionar hora</label>
                <input type="number" v-model="turno.hora" id="horaTurno" class="form-control" maxlength="2" size="2">
                <input type="number" v-model="turno.min" class="form-control" maxlength="2" size="2">
            </div>
            <div class="form-group col-3">
                <label for="descTurno" class="col">Descripción</label>
                <input type="text" v-model="turno.descripcion" id="descTurno" class="col form-control">
            </div>
            <button v-if="edit === false" class="btn btn-primary btn-block">Aceptar</button>
            <button v-else class="btn btn-primary btn-block">Actualizar</button>
        </form>
        <button class="btn btn-secondary btn-block" @click="cancelar()">Cancelar</button>
    </div>


</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {es} from 'vuejs-datepicker/dist/locale'

class Turno {
    constructor(dia, mes, anio, hora, min, descripcion, user) {
        this.dia = dia
        this.mes = mes
        this.anio = anio
        this.hora = hora
        this.min = min
        this.descripcion = descripcion
        this.user = user
    }
}

export default {
    components: {
        Datepicker
    },
    data(){
        return{
            state: {
                highlighted: {
                    dates: []
                }
            },
            es: es,
            fecha: null,
            fechaDia: null,
            fechaMes: null,
            fechaAnio: null,
            users: [],
            userSelect: null,
            seccion: 'tabla',
            turno: new Turno(),
            turnos: [],
            turnosDia: [],
            formato: "dd/MM/yyyy",
            usuario: {
                "email": '',
                "nombre": '',
                "apellido": ''
            },
            edit: false,
            turnoToEdit: ''
        }
    },
    created(){
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login')
        }
        //this.getUsers()
    },
    mounted(){
      this.getUser()  
    },
    methods: {
        cancelar(){
            this.seccion = "tabla"
            this.edit = false
        },
        getUser(){
            fetch('/api/users/profile', {
                method: 'GET',
                //body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token'),
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.usuario.email = data.user.email
                this.usuario.nombre = data.user.nombre
                this.usuario.apellido = data.user.apellido
                this.getTurnos()
            })
        },
        getTurnos(){ 
            fetch('/api/turnos/' + this.usuario.nombre + " " + this.usuario.apellido)
            .then(res => res.json())
            .then(data => {
                this.turnos = data
                this.resaltarFechas()
            })
        },
        getTurnosDia(){ 
            fetch('/api/turnos/' + this.usuario.nombre + " " + this.usuario.apellido + '/' + this.fechaDia + '/' + this.fechaMes + '/' + this.fechaAnio)
            .then(res => res.json())
            .then(data => {
                this.turnosDia = data
            })
        },
        newTurno(){
            this.turno.user = this.usuario.nombre + " " + this.usuario.apellido
            this.turno.dia = this.fechaDia
            this.turno.mes = this.fechaMes
            this.turno.anio = this.fechaAnio

            if (this.edit) {
                fetch('/api/turnos/' + this.turnoToEdit, {
                    method: 'PUT',
                    body: JSON.stringify(this.turno),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
            } else {
                fetch('/api/turnos', {
                method: 'POST',
                body: JSON.stringify(this.turno),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
                })
                .then(res => res.json())
            }
            this.turno = new Turno()
            this.seccion = 'tabla'
            this.edit = false
            this.getTurnos()
            this.getTurnosDia()
        },
        editON(turno){
            this.seccion = "form"
            this.edit = true
            fetch('/api/turnos/turno/' +turno)
                .then(res => res.json())
                .then(data => {
                    this.turno = new Turno(data.dia, data.mes, data.anio, data.hora, data.min, data.descripcion, data.user)
                    this.turnoToEdit = data._id
            })
            
        },
        eliminarTurno(turno){
            fetch('/api/turnos/' + turno, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTurnosDia()
            })
        },
        resaltarFechas(){
            this.state.highlighted.dates = []
            this.turnos.forEach(this.resaltar)
        },
        resaltar(turno,index){
            this.state.highlighted.dates.push(new Date(turno.anio, turno.mes -1, turno.dia))
        }
    },
    watch: {
        fecha: function(){
            this.fechaDia = this.fecha.getDate()
            this.fechaMes = (this.fecha.getMonth() + 1)
            this.fechaAnio = this.fecha.getFullYear()
            this.getTurnosDia()
        }
    },
    computed: {
        /*
        turnosOrdenados: function(){
            let turnosOrdenados = []
            this.turnosDia.forEach(arrayHoras)
            function arrayHoras(turno, index){
                turnosOrdenados[index] = turno.hora * 100 + turno.min
            }
            console.log(turnosOrdenados)
           
           -----------
           if (typeof this.turnosDia[0] !== 'undefined') {
              console.log(this.turnosDia[0].hora)  
            }
            let turnosOrdenados = this.turnosDia.sort(function (a, b) {
                console.log("a: " + (a.hora * 100 + a.min))
                console.log("b: " + (b.hora * 100 + b.min))
                if ((a.hora * 100 + a.min) > (b.hora * 100 + b.min)) {
                    return 1;
                }
                if ((a.hora * 100 + a.min) < (b.hora * 100 + b.min)) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            ------------
            return turnosOrdenados
        }*/
    }
}
</script>