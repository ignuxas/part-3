const state = {
        showDeleteWindow: false,
        showMutateWindow: false,
        editMode: false,
    }

const getters = {
    getShowDeleteWindow: state => state.showDeleteWindow,
    getShowMutateWindow: state => state.showMutateWindow,
    getEditMode: state => state.editMode,
}

const actions = {}

const mutations = {
    toggleShowDeleteWindow(state, value) {
        if (value) state.showDeleteWindow = value;
        else state.showDeleteWindow = !state.showDeleteWindow;
    },
    toggleShowMutateWindow(state, value) {
        if (value) state.showMutateWindow = value;
        else state.showMutateWindow = !state.showMutateWindow;
    },
    setEditMode(state, edit) {
        state.editMode = edit;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}



