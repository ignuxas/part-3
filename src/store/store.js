import Vue from 'vue';
import Vuex from 'vuex';
import postData from './modules/postData';
import mutateData from './modules/mutateData';
import pageData from './modules/pageData';

Vue.use(Vuex);

//ToDo: Add modules (microsoft teams example)

export default new Vuex.Store({
    modules: {
        postData,
        mutateData,
        pageData,
    },
});