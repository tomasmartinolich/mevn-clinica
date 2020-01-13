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
import io from 'socket.io-client';

export default {
    data(){
        return {
            enEspera: [],
            socket : io('localhost:3000')
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
                    console.log("get lista espera:")
                        this.enEspera = data
                })
        },
        quitarDeEspera(paciente){      
            console.log("quitar 1:")
            console.log(paciente) 
            fetch('/api/listaEspera/' + paciente._id, {
                method: 'PUT',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(this.getListaEspera)
            .then(this.socket.emit('quitarPaciente', paciente))
           // .then(this.enEspera.pop(paciente))
        }
    },
    sockets: {
        actualizarLista(){
            this.getListaEspera();
        },
        quitarDeLista(data){
            console.log("quitar 2:")
            console.log(data)
            this.enEspera.pop(data)
        },
        agregarALista(paciente){
            //CHEQUEA QUE NO ESTÉ EN LA SALA PARA AGREGARLO
            let arrayPaciente1 = Object.values(paciente) //convierte el paciente de obj. a array
            let pacienteEncontrado = false
            this.enEspera.forEach(function(item){
                let arrayPaciente2 = Object.values(item)
                if (arrayPaciente2[0] === arrayPaciente1[0]) {
                    pacienteEncontrado = true;
                }
            })
            if (!pacienteEncontrado) {
                this.enEspera.push(paciente)
            }       
        }
        
    }
}
</script>

