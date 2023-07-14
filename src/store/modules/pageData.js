const state = {
    postsPerPage: 12,
    totalPosts: 0,
    currentPage: 1,

    search: '',
}

const getters = {
    getCurrentPage: state => state.currentPage,
    getPostsPerPage: state => state.postsPerPage,
    getTotalPosts: state => state.totalPosts,
    getSearch: state => state.search,
    getLastPage: state => Math.ceil(state.totalPosts / state.postsPerPage),
}

const actions = {}

const mutations = {
    setTotalPosts(state, total) {
        state.totalPosts = total;
    },
    setSearch(state, search) {
        state.search = search;
    },
    setCurrentPage(state, page) {
        state.currentPage = page;
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
    lastItemOnPageCheck(state) {
        if (
            state.currentPage  === Math.ceil(state.totalPosts / state.postsPerPage)
            && state.totalPosts % state.postsPerPage === 1
        ) {
            if (state.currentPage > 1) {
                state.currentPage--;
                return true;
        }} else return false;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}



