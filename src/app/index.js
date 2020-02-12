import Vue from 'vue';
window.EventBus = new Vue();
import VueRouter from 'vue-router';
import App from './App.vue';

import VueSocketIO from 'vue-socket.io'

import pacientes from './components/pacientes.vue';
import consultas from './components/consultas.vue';
import login from './components/login.vue';
import turnos from './components/turnos.vue';
import permisos from './components/permisos.vue';
Vue.use(VueRouter);

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

Vue.use(new VueSocketIO({
    debug: true,
    connection: host+":"+ port
    //options: { path: "/" } //Optional options
}))


const routes = [
    {path: '/', component: pacientes},
    {path: '/paciente/:id', name:'paciente', component: consultas, props: true},
    {path: '/login', name: 'login', component: login},
    {path: '/turnos', name: 'turnos', component: turnos},
    {path: '/permisos', name: 'permisos', component: permisos}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
