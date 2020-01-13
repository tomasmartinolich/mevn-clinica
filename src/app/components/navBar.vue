<template>
<div>
    <div class="container-fluid sticky-top">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-header">
                <a href="" class="navbar-brand">CEDYT Administrador</a>
            </div>
            <ul class="nav navbar-nav">
                <router-link to="/">
                    <button type="button" class="btn btn-dark col">Pacientes</button>
                </router-link>
                <router-link to="/turnos">
                    <button type="button" class="btn btn-dark col">Turnos</button>
                </router-link>
                <!--
                <router-link to="/login">
                    <button type="button" class="btn btn-dark col">Iniciar sesión</button>
                </router-link>
                -->
                <button type="button" class="btn btn-dark col" v-if="user.email !== ''" @click="cerrarSesion">Cerrar sesión</button>
                <div class="dropdown">
                    <button class="btn btn-dark dropdown-toggle" v-if="user.email !== ''" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{user.nombre + " " + user.apellido}}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </ul>   
        </nav>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            user: {
                "email": '',
                "nombre": '',
                "apellido": ''
            }
        }
    },
    mounted(){
        this.getUser()
    },
    methods: {
        cerrarSesion(){
            localStorage.clear()
            this.user.email = ""
            this.user.nombre = ""
            this.user.apellido = ""
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
                })
        }
    }
}
</script>
