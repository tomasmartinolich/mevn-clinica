<template>
<div>
    <div class="container-fluid sticky-top">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-header">
                <a href="/" class="navbar-brand">CEDYT Administrador</a>
            </div>
            <ul class="nav navbar-nav">
                <router-link to="/" class="col">
                    <button type="button" class="btn btn-dark">Pacientes</button>
                </router-link>
                <router-link to="/paciente/3456" class="col">
                    <button type="button" class="btn btn-dark">Consultas</button>
                </router-link>
                <router-link to="/login" class="col">
                    <button type="button" class="btn btn-dark">Login</button>
                </router-link>
            </ul>   
        </nav>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>
