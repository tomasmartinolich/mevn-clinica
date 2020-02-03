<template>
    <div>
        <!-- FORM DE LOGIN -->
        <div class="container col-3" v-if="this.loginForm">
            <h2 class="text-center">Iniciar sesión</h2>
            <form @submit.prevent="login">
                <div class="form-group row">
                    <label for="email" class="text-center">Email</label>
                    <input type="email" id="email" v-model="user.email" placeholder="Ingrese su dirección de Email" class="form-control">
                </div>
                <div class="form-group row">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" v-model="user.pass" placeholder="Ingrese su contraseña" class="form-control">
                </div>
                <button class="btn btn-success btn-block">Ingresar</button>
            </form>
            <button class="btn btn-primary btn-block" @click="formSwitch()">Registrar nuevo usuario</button>
        </div>

        <!-- FORM DE REGISTRO -->
        <div class="container col-3" v-if="!this.loginForm">
            <h3 class="text-center">Registro de usuario</h3>
            <form @submit.prevent="register">
                <div class="form-group row">
                    <label for="email" class="text-center">Email</label>
                    <input type="email" id="email" v-model="user.email" placeholder="Ingrese su dirección de Email" class="form-control">
                </div>
                <div class="form-group row">
                    <label for="nombre" class="text-center">Nombre</label>
                    <input type="text" id="nombre" v-model="user.nombre" placeholder="Ingrese su nombre" class="form-control">
                </div>
                <div class="form-group row">
                    <label for="apellido" class="text-center">Apellido</label>
                    <input type="text" id="apellido" v-model="user.apellido" placeholder="Ingrese su apellido" class="form-control">
                </div>
                <div class="form-group row">
                    <label for="espec" class="text-center">Especialidad</label>
                    <input type="text" id="espec" v-model="user.especialidad" placeholder="Ingrese su apellido" class="form-control">
                </div>
                <div class="form-group row">
                    <label for="matnac" class="text-center">Matrícula nacional</label>
                    <input type="number" id="matnac" v-model="user.matnac" placeholder="Ingrese su apellido" class="form-control">
                </div>
                <div class="form-group row">
                    <label for="matprov" class="text-center">Matrícula provincial</label>
                    <input type="number" id="matprov" v-model="user.matprov" placeholder="Ingrese su apellido" class="form-control">
                </div>
                <div class="form-group row">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" v-model="user.pass" placeholder="Ingrese su contraseña" class="form-control">
                </div>
                <div class="form-group row">
                    <label for="password2">Repetir contraseña</label>
                    <input type="password" id="password2" v-model="pass2" placeholder="Repita la contraseña ingresada" class="form-control">
                </div>
                <button class="btn btn-success btn-block">Registrar</button>
            </form>
            <button class="btn btn-secondary btn-block" @click="formSwitch()">Cancelar</button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import EventBus from './event-bus.js';

class User {
    constructor(nombre,apellido,email, especialidad, matnac, matprov, pass) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.especialidad = especialidad
        this.matnac = matnac
        this.matprov = matprov
        this.pass = pass
    }
}

export default {
    name: 'login',
    data(){
        return{
            user: new User(),
            loginForm: true,
            ok: false,
            pass2: ''
        }
    },
    methods: {
        login(){
            fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(this.user),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })   
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem('token', data.token);
                    this.user = localStorage.getItem('token')
                    EventBus.$emit('logueado', this.user);
                    this.$router.push('/'); 
                }else{
                    alert(data.message)
                }          
            })
        },
        register(){
            if (this.user.pass === this.pass2) {
                fetch('/api/users/registro', {
                    method: 'POST',
                    body: JSON.stringify(this.user),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    alert(data.message)
                })
                .then(this.user = new User())     
            } else {
                alert("No ha repetido correctamente la contraseña.")
            }
            
        },
        formSwitch(){
            this.user = new User()
            this.pass2 = ''
            this.loginForm = !this.loginForm
        }
    }
}
</script>

