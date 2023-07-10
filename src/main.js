import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './routes';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan, faPen, faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashCan, faPen, faMagnifyingGlass, faHouse)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes,
    // mode: 'history' // this breaks states
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: (h) => h(App),
})
