// Importando Vue
window.Vue = require('vue');

// Componentes
Vue.component('formulario',require('./components/formulario.vue'));
Vue.component('rut',require('./components/rut.vue'));

// instancia Vue principal
var vm = new Vue({
    el: '#app',
    data:{
        
    }
});