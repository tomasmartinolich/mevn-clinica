import Vue from 'vue';
window.EventBus = new Vue();
import VueRouter from 'vue-router';
import App from './App.vue';

import VueSocketIO from 'vue-socket.io'

import pacientes from './components/pacientes.vue';
import consultas from './components/consultas.vue';
import login from './components/login.vue';
import turnos from './components/turnos.vue';
Vue.use(VueRouter);

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000'
    //options: { path: "/" } //Optional options
}))


const routes = [
    {path: '/', component: pacientes},
    {path: '/paciente/:id', name:'paciente', component: consultas, props: true},
    {path: '/login', name: 'login', component: login},
    {path: '/turnos', name: 'turnos', component: turnos}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
