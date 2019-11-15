<template>
<div>

        <table class="table table-sm table-bordered table-hover">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th>Sala de espera</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lista of enEspera">
                    <td>{{lista.apellido + " " + lista.nombre}}</td>
                    <td><button class="btn btn-danger" @click="quitarDeEspera(lista)">X</button></td>
                </tr>
            </tbody>
        </table>

</div>
</template>

<script>
export default {
  //  props:['listaEspera'],
    data(){
        return {
            enEspera: []
        }  
    },
    mounted() {
        this.getListaEspera()
    },
    methods: {
        getListaEspera() {   
            fetch('/api/listaEspera')
                .then(res => res.json())
                .then(data => {
                        this.enEspera = data
                })
        },
        quitarDeEspera(paciente){
            fetch('/api/listaEspera/' + paciente._id, {
                method: 'PUT',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(this.enEspera.pop(paciente))
        }
    }
}
</script>

