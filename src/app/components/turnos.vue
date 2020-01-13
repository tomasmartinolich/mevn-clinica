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
                <tr v-for="turno of turnos">
                    <td>{{turno.hora}}</td>
                    <td>{{turno.descripcion}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="seccion === 'form'">
        <form @submit.prevent="newTurno">
            <div class="form-group col-3">
                <label for="horaTurno" class="col">Seleccionar hora</label>
                <input type="number" v-model="turno.hora" id="horaTurno" class="col form-control">
            </div>
            <div class="form-group col-3">
                <label for="descTurno" class="col">Descripción</label>
                <input type="text" v-model="turno.descripcion" id="descTurno" class="col form-control">
            </div>
            <button class="btn btn-primary btn-block">Aceptar</button>
        </form>
        <button class="btn btn-secondary btn-block" @click="seccion = 'tabla'">Cancelar</button>
    </div>


</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {es} from 'vuejs-datepicker/dist/locale'
import css from './turnos.css';
//import MicroModal from 'micromodal';
//var MicroModal = require('micromodal');

class Turno {
        constructor(dia, mes, anio, hora, descripcion, user) {
            this.dia = dia
            this.mes = mes
            this.anio = anio
            this.hora = hora
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
            formato: "dd/MM/yyyy",
            usuario: {
                "email": '',
                "nombre": '',
                "apellido": ''
            }
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
                })
        },
        /*
        getUsers() {
            fetch('/api/users')
                .then(res => res.json())
                .then(data => {
                    console.log("users:")
                    console.log(data)
                    this.users = data
                })
        },*/
        getTurnos(){ 
            fetch('/api/turnos/' + this.usuario.nombre + " " + this.usuario.apellido + '/' + this.fechaDia + '/' + this.fechaMes + '/' + this.fechaAnio)
            .then(res => res.json())
            .then(data => {
                this.turnos = data
                console.log(this.turnos)
            })
        },
        newTurno(){
            console.log("hora: " + this.turno.hora)
            this.turno.user = this.usuario.nombre + " " + this.usuario.apellido
            this.turno.dia = this.fechaDia
            this.turno.mes = this.fechaMes
            this.turno.anio = this.fechaAnio
            
            fetch('/api/turnos', {
                method: 'POST',
                body: JSON.stringify(this.turno),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.turno = new Turno()
                    this.seccion = 'tabla'
                    this.getTurnos()
                })
            
        }
    },
    watch: {
        fecha: function(){
            this.fechaDia = this.fecha.getDate()
            this.fechaMes = (this.fecha.getMonth() + 1)
            this.fechaAnio = this.fecha.getFullYear()
            this.getTurnos()
        }
    }
}
</script>