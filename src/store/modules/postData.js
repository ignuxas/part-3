const state = {
        currentPostId: null,
        currentPost: {},
        currentAuthor: {},

        posts: [],
        authors: [],
    }

const getters = {
    getCurrentPostId: state => state.currentPostId,
    getCurrentPost: state => state.currentPost,
    getCurrentAuthor: state => state.currentAuthor,
    getPosts: state => state.posts,
    getAuthors: state => state.authors,
}

const actions = {}

const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
    setAuthors(state, authors) {
        state.authors = authors;
    },
    setCurrentAuthor(state, author) {
        state.currentAuthor = author;
    },
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



