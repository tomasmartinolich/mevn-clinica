<template>
    <div id="app">   
        <div class="row"><navBar/></div>     
        <div class="row">
       <!--     <button @click="agregaUno">Prueba lista</button> -->
            <div class="col-10"><router-view/></div>       
            <div class="col-2"><salaEspera/></div>
        </div>
        
    </div>
</template>


<script>
import navBar from './components/navBar.vue';
import pacientes from './components/pacientes.vue';
import consultas from './components/consultas.vue';
import salaEspera from './components/salaEspera.vue';

export default {
    name: 'App',
    components: {
        navBar,
        pacientes,
        consultas,
        salaEspera
    },
    data() {
        return {
        //    listaEspera: ['Paciente 1'],
            seccion: 'pacientes'
        }  
    },
    methods: {
        agregaUno() {
            this.listaEspera.push("Probanding");
        }
    }
}
</script>


