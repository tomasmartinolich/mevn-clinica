<template>
<div>

<!-- TABLA PERMISOS -->
<div class="container">
    <div class="col">
        <table class="table table-bordered table-hover">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th>Usuario</th>
                    <th>Administrador</th>
                    <th>Manejo global de turnos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user of users">
                    <td>{{user.nombre + " " + user.apellido}}</td>
                    <td>
                        <button v-if="user.admin" @click="permisoAdmin(user._id, 'admin', false)" class="btn btn-danger">Quitar</button>  
                        <button v-else @click="permisoAdmin(user._id, 'admin', true)" class="btn btn-success">Agregar</button>                     
                    </td>
                    <td>
                        <button v-if="user.turnos" @click="permisoAdmin(user._id, 'turnos', false)" class="btn btn-danger">Quitar</button>  
                        <button v-else @click="permisoAdmin(user._id, 'turnos', true)" class="btn btn-success">Agregar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!-- TABLA PENDIENTES -->
<br/><br/><br/>
<h4>Lista de usuarios pendientes de aprobación</h4>
<div class="container">
    <div class="col">
        <table class="table table-bordered table-hover">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th>Usuario</th>
                    <th>Acceso</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user of pendingUsers">
                    <td>{{user.nombre + " " + user.apellido}}</td>
                    <td>
                        <button v-if="user.pending" @click="permisoAdmin(user._id, 'pending', false)" class="btn btn-success">Permitir</button>  
                        <button v-else @click="permisoAdmin(user._id, 'pending', true)" class="btn btn-danger">Prohibir</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</div>
</template>

<script>
export default {
    data(){
        return {
            users: [],
            pendingUsers: []
        }
    },
    created() {
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login')
        }
    },
    mounted(){
        this.userAuth()
    },
    methods: {
        userAuth(){
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
                this.getUsers()
            })
        },
        getUsers(){
            fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                this.users = data    
                this.getPendingUsers()  
            })
        },
        getPendingUsers(){
            fetch('/api/users/pending')
            .then(res => res.json())
            .then(data => {
                this.pendingUsers = data      
            })
        },
        permisoAdmin(user, tipo, permiso){    
            console.log(typeof tipo)
            fetch('/api/users/' + permiso, {
                method: 'PUT',
                //body: JSON.stringify(user, permiso, bool),
                headers: {
                    'Accept': 'application/json',
                    'user': user,
                    'permiso': tipo,
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(this.getUsers())
        }
    }
}
</script>

