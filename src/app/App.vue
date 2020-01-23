<template>
    <div id="app">   
        <navBar v-if="token"/> 
        <div class="container-fluid row">
            <div class="col-10"><router-view/></div>       
            <div class="col-2 py-md-5"><salaEspera v-if="token"/></div>  
        </div>
    </div>
</template>


<script>
import Vue from 'vue';
import EventBus from './components/event-bus.js';

import navBar from './components/navBar.vue';
import pacientes from './components/pacientes.vue';
import consultas from './components/consultas.vue';
import salaEspera from './components/salaEspera.vue';
import login from './components/login.vue';
import turnos from './components/turnos.vue';
import permisos from './components/permisos.vue';



export default {
    name: 'App',
    components: {
        navBar,
        login,
        pacientes,
        consultas,
        turnos,
        salaEspera,
        permisos
    },
    created(){
        if (localStorage.getItem('token') !== null) {
            this.token = true
        }
    },
    mounted(){
        EventBus.$on('logueado', coso => {
            this.token = true
        });

        EventBus.$on('logout', coso => {
            this.token = false
        });
    },
    data() {
        return {
            seccion: 'pacientes',
            token: false,
        }  
    },
    methods: {

    }
}



</script>


