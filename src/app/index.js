import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

//import navBar from './components/navBar.vue';
//import pacientes from './components/pacientes.vue';

import pacientes from './components/pacientes.vue';
import consultas from './components/consultas.vue';
import login from './components/login.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: pacientes},
    {path: '/paciente/:id', name:'paciente', component: consultas, props: true},
    {path: '/login', name: 'login', component: login}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

