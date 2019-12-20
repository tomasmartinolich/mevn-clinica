import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
//import socketio from 'socket.io';

import VueSocketIO from 'vue-socket.io'

//import * as io from 'socket.io-client'
import pacientes from './components/pacientes.vue';
import consultas from './components/consultas.vue';
import login from './components/login.vue';
import turnos from './components/turnos.vue';
Vue.use(VueRouter);
/*
export const SocketInstance = socketio('http://localhost:3000');

Vue.use(VueSocketIO, SocketInstance)
*/

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

