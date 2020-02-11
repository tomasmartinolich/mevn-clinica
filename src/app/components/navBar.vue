<template>
<div>
    <div class="container-fluid sticky-top">
        <nav class="navbar navbar-expand navbar-dark bg-dark" v-if="token">
            <div class="navbar-header">
                <a class="navbar-brand">CEDYT Administrador</a>
            </div>
            <ul class="nav navbar-nav">
                
                <router-link to="/">
                    <button type="button" class="btn btn-dark">Pacientes</button>
                </router-link>
                <router-link to="/turnos">
                    <button type="button" class="btn btn-dark">Turnos</button>
                </router-link>
                <router-link to="/permisos">
                    <button type="button" v-if="user.admin == true" class="btn btn-dark">Permisos</button>
                </router-link>
                <button type="button" class="btn btn-dark" @click="cerrarSesion">Cerrar sesión</button>
                <button class="btn btn-dark">{{user.nombre + " " + user.apellido}}</button>
            </ul>   
        </nav>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import EventBus from './event-bus.js';

export default {
    data(){
        return{
            token: localStorage.getItem('token'),
            user: {
                "email": '',
                "nombre": '',
                "apellido": '',
                "especialidad": '',
                "matnac": 0,
                "matprov": 0,
                "admin": false
            }
        }
    },
    mounted(){
        this.getUser()
    },
    methods: {
        cerrarSesion(){
            localStorage.clear()
            this.user=""
            EventBus.$emit('logout');
            this.$router.push('/login')
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
                    this.user.email = data.user.email
                    this.user.nombre = data.user.nombre
                    this.user.apellido = data.user.apellido
                    this.user.especialidad = data.user.especialidad
                    this.user.matnac = data.user.matnac
                    this.user.matprov = data.user.matprov
                    this.user.admin = data.user.admin   
                })
        }
    }
}
</script>
