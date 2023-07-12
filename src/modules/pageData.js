const state = {
    currentPage: 1,
    postsPerPage: 12,
    totalPosts: 0,

    search: '',
}

const getters = {
    getCurrentPage: state => state.currentPage,
    getPostsPerPage: state => state.postsPerPage,
    getTotalPosts: state => state.totalPosts,
    getSearch: state => state.search,
}

const actions = {}

const mutations = {
    setTotalPosts(state, total) {
        state.totalPosts = total;
    },
    setSearch(state, search) {
        state.search = search;
    },
    incrimentCurrentPage(state) {
        if (state.currentPage < state.totalPosts / state.postsPerPage) {
            state.currentPage++;
        }
    },
    decrimentCurrentPage(state) {
        if (state.currentPage > 1) {
            state.currentPage--;
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}



