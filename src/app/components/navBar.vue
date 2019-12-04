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
                <router-link to="/login">
                    <button type="button" class="btn btn-dark col">Iniciar sesión</button>
                </router-link>
                <div class="dropdown">
                    <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Usuario 1
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
    
}
</script>
