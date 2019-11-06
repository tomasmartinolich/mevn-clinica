<template>
    <div id="app">        
        <navBar/>
        <pacientes v-if="seccion==='pacientes'"/>
        <consultas v-else-if="seccion==='consultas'"/>
    </div>
</template>


<script>
import navBar from './components/navBar.vue';
import pacientes from './components/pacientes.vue';
import consultas from './components/consultas.vue';

export default {
    name: 'App',
    components: {
        navBar,
        pacientes,
        consultas
    },
    data() {
        return {
            seccion: 'pacientes'
        }  
    }
}
</script>


