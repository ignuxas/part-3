import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './routes';
import store from './store/store';

import api from './plugins/api';

import vueDebounce from 'vue-debounce'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan, faPen, faMagnifyingGlass, faHouse,
         faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashCan, faPen, faMagnifyingGlass, faHouse, faChevronLeft, faChevronRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter);
Vue.use(api, store);
Vue.use(vueDebounce, {
    defaultTime: '500ms'
})

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
