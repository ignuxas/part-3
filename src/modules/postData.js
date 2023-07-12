const state = {
        currentPostId: null,
        currentPost: null,
    }

const getters = {
    getCurrentPostId: state => state.currentPostId,
    getCurrentPost: state => state.currentPost,
}

const actions = {}

const mutations = {
    setCurrentPostId(state, id) {
        state.currentPostId = id;
    },
    setCurrentPost(state, post) {
        state.currentPost = post;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}



