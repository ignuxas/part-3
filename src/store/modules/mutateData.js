const state = {
        showDeleteWindow: false,
        showMutateWindow: false,
        editMode: false,

        showStatus: false,
        currentStatus: 200,
    }

const getters = {
    getShowDeleteWindow: state => state.showDeleteWindow,
    getShowMutateWindow: state => state.showMutateWindow,
    getShowStatus: state => state.showStatus,
    getStatus: state => state.currentStatus,
    getEditMode: state => state.editMode,
}

const actions = {}

var statusShown = false;
const mutations = {
    toggleShowDeleteWindow(state, value) {
        if (value) state.showDeleteWindow = value;
        else state.showDeleteWindow = !state.showDeleteWindow;
    },
    toggleShowMutateWindow(state, value) {
        if (value) state.showMutateWindow = value;
        else state.showMutateWindow = !state.showMutateWindow;
    },
    toggleStatus(state, status) {
        if(!statusShown) {
            state.showStatus = true;
            statusShown = true;
            setTimeout(() => {
                state.showStatus = false;
                statusShown = false;
            }, 3000);
        }
        if(status) state.currentStatus = status;
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



