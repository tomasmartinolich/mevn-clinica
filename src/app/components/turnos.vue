<template>
<div>
    <div v-if="usuario.turnos">
        <h2 v-if="userSelect === null">Seleccionar usuario</h2>
        <h2 v-else>Turnos de {{userSelect}}</h2>
        <select v-model="userSelect" class="form-control" @change="selectUser">
            <option v-for="user of users">{{user.nombre + " " + user.apellido}}</option>
        </select>
    </div>


    <h4 v-if="userSelect === null">{{ usuario.nombre + " " + usuario.apellido}}</h4>

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
        <button class="btn btn-warning" @click="sortTable()">Ordenar turnos</button>
        <table id="tablaTurnos" class="table table-bordered table-hover">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>Teléfono</th>
                    <th>Cobertura</th>
                    <th>Motivo de la consulta</th>
                    <th>Observaciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="turno of turnosDia">
                    <td>{{turno.hora}}:{{turno.min}}<span v-if="turno.min === 0">0</span></td>
                    <td>{{turno.paciente}}</td>
                    <td>{{turno.telefono}}</td>
                    <td>{{turno.cobertura}}</td>
                    <td>{{turno.motivo}}</td>
                    <td>{{turno.obser}}</td>
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
            <div class="form-group">
                <label for="horaTurno" class="col">Seleccionar hora</label>
                <div class="row">
                    <input type="number" v-model="turno.hora" id="horaTurno" class="form-control col-1" maxlength="2" size="2" placeholder="hs">
                    <input type="number" v-model="turno.min" value=00 class="form-control col-1" maxlength="2" size="2" placeholder="min">
                </div>

            </div>
            <div class="form-group col-3">
                <label for="descTurno" class="col">DNI del paciente</label>
                <input type="number" v-model="turno.paciente" id="descTurno" class="col form-control">
            </div>
            <div class="form-group col-3">
                <label for="motivo" class="col">Motivo de la consulta</label>
                <input type="text" v-model="turno.motivo" id="motivo" class="col form-control">
            </div>
            <div class="form-group col-3">
                <label for="obs" class="col">Observaciones</label>
                <input type="text" v-model="turno.obser" id="obs" class="col form-control">
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
    constructor(dia, mes, anio, hora, min, paciente, motivo, obser, user) {
        this.dia = dia
        this.mes = mes
        this.anio = anio
        this.hora = hora
        this.min = min
        this.paciente = paciente
        this.motivo = motivo
        this.obser = obser
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
            usr_selected: {
                "nombre": '',
                "apellido": ''
            },
            seccion: 'tabla',
            turno: new Turno(),
            turnos: [],
            turnosDia: [],
            formato: "dd/MM/yyyy",
            usuario: {
                "email": '',
                "nombre": '',
                "apellido": '',
                "turnos": false
            },
            edit: false,
            turnoToEdit: '',
            pacientes: []
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
                this.usuario.turnos = data.user.turnos
                if (this.usuario.turnos) {
                    this.getUserList()
                }else{
                    this.getTurnos(this.usuario)
                }
                
            })
        },
        getUserList(){
            fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                this.users = data    
            })
            .then(this.getTurnos(this.usuario))
        },
        checkUsr(){
            if (this.userSelect !== null) {
                this.usr_selected.nombre = this.userSelect.split(" ")[0]
                this.usr_selected.apellido = this.userSelect.split(" ")[1]  
            }
            
            if (this.usr_selected.nombre !== '' && this.usr_selected.nombre !== this.usuario.nombre && this.usr_selected.apellido !== this.usuario.apellido) {
                return this.usr_selected    
            } else{
                return this.usuario
            }
        },
        selectUser(){
            this.turnos = []
            this.turnosDia = []
            this.getTurnos(this.checkUsr())
        },
        getTurnos(usuario){ 
            fetch('/api/turnos/' + usuario.nombre + " " + usuario.apellido)
            .then(res => res.json())
            .then(data => {
                this.turnos = data
            })
        },
        resaltar(turno,index){
            this.state.highlighted.dates.push(new Date(turno.anio, turno.mes -1, turno.dia))
        },
        getTurnosDia(usuario){ 
            fetch('/api/turnos/' + usuario.nombre + " " + usuario.apellido + '/' + this.fechaDia + '/' + this.fechaMes + '/' + this.fechaAnio)
            .then(res => res.json())
            .then(data => {
                this.turnosDia = data
            })
        },
        newTurno(){
            this.turno.user = this.checkUsr()
            this.turno.user = this.turno.user.nombre + " " + this.turno.user.apellido
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
            this.getTurnos(this.checkUsr())
            this.getTurnosDia(this.checkUsr())
        },
        editON(turno){
            this.seccion = "form"
            this.edit = true
            fetch('/api/turnos/turno/' +turno)
                .then(res => res.json())
                .then(data => {
                    this.turno = new Turno(data.dia, data.mes, data.anio, data.hora, data.min, data.paciente, data.motivo, data.obser, data.user)
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
                this.getTurnosDia(this.checkUsr())
            })
        },
        sortTable() {
            var table, rows, switching, i, x, y, shouldSwitch;
            table = document.getElementById("tablaTurnos");
            switching = true;
            /*Make a loop that will continue until
            no switching has been done:*/
            while (switching) {
                //start by saying: no switching is done:
                switching = false;
                rows = table.rows;
                /*Loop through all table rows (except the
                first, which contains table headers):*/
                for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];
                
                let xx = parseInt(x.innerHTML.split(":")[0] * 100) + parseInt(x.innerHTML.split(":")[1])
                let yy = parseInt(y.innerHTML.split(":")[0] * 100) + parseInt(y.innerHTML.split(":")[1])
                
                //check if the two rows should switch place:
                if (Number(xx) > Number(yy)) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
                }
                if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                }
            }
        }
    },
    watch: {
        fecha: function(){
                this.fechaDia = this.fecha.getDate()
                this.fechaMes = (this.fecha.getMonth() + 1)
                this.fechaAnio = this.fecha.getFullYear()
                this.getTurnosDia(this.checkUsr())  
            
        },
        turnos: function(){
            this.state.highlighted.dates = []
            this.turnos.forEach(this.resaltar)
        },
        turnosDia: function(){   
            for (let index = 0; index < this.turnosDia.length; index++) {
                fetch('/api/tasks/DNI/' + this.turnosDia[index].paciente)
                .then(res => res.json())
                .then(data => {
                    //this.users = data
                    this.turnosDia[index].paciente = data.nombre + " " + data.apellido 
                    this.turnosDia[index].telefono = data.telefono 
                    this.turnosDia[index].cobertura = data.cobertura   
                })
            }
            this.sortTable()
        },
    }
}
</script>