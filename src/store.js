import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPostId: null,
        currentPost: null,

        showDeleteWindow: false,
        showMutateWindow: false,
        editMode: false,

        currentPage: 1,
        postsPerPage: 12,
        totalPosts: 0,
    },
});