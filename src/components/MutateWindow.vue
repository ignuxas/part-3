<template>
    <div id="MutateWindow" :class="{hidden: !getShowMutateWindow}">
        <form id="CreateUserContainer">
            <h2 v-if="getEditMode">Edit Post</h2>
            <h2 v-else>Create Post</h2>
            <div class="formSmallInputs">
                <input type="text" id="Title" v-model="title" placeholder="Title"/>
                <select id="AuthorId" :class="{disabled: getEditMode}" v-model="selectedAuthorId">
                    <option v-for="author in authors" :key="author.id" :value="author.id">
                        {{ author.name }}
                    </option>
                </select>
            </div>
            <textarea id="Content" placeholder="Content" v-model="content"  ></textarea>
            <div class="MutateErrors">
                <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
            <button v-if="getEditMode" type="Submit" @click.prevent="editPost">Submit</button>
            <button v-else type="Submit" @click.prevent="createPost">Create</button>
        </form>
    <div class="blackBg" @click="() => {toggleShowMutateWindow()}"></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "MutatePost",
    data() {return {
        selectedAuthorId: null,
        title: "",
        content: "",
        status: 200,
        errors: [],
    }},
    props: {
        authors: {
            type: Array,
            required: true,
        },
    },
    watch: {
        getShowMutateWindow(){
            this.getData();
        },
    },
    computed: {
        ...mapGetters("postData", ["getCurrentPost"]),
        ...mapGetters('mutateData', ["getShowMutateWindow", "getShowDeleteWindow", "getEditMode", "toggleStatus"]),
        ...mapGetters("pageData", ["getCurrentPage", "getLastPage"]),
    }, 
    methods: {
        ...mapMutations("postData", ["createPost", "editPost"]),
        ...mapMutations("mutateData", ["toggleShowDeleteWindow", "toggleShowMutateWindow"]),
        getData(){
            if(this.getEditMode){
                this.title = this.getCurrentPost.title;
                this.content = this.getCurrentPost.body;
                this.selectedAuthorId = this.getCurrentPost.authorId;
            } else {
                this.title = "";
                this.content = "";
                this.selectedAuthorId = null;
            }
        },
        checkInputValidity(){
            const titleInput = document.getElementById("Title");
            const contentInput = document.getElementById("Content");
            const authorSelect = document.getElementById("AuthorId");

            const inputList = [
                titleInput,
                contentInput,
                authorSelect,
            ]

            // remove invalid class from all inputs
            inputList.forEach((input) => {
                if(input.classList.contains("invalid")){
                    input.classList.remove("invalid");
                }
            });
            this.errors = [];

            let didFail = false;
            if(this.title.length < 3 || this.title.length > 50){
                titleInput.classList.add("invalid");
                this.errors.push("Title must be between 3 and 50 characters.");
                didFail = true;
            }
            if(this.content.length < 3 || this.content.length > 500 ){
                contentInput.classList.add("invalid");
                this.errors.push("Content must be between 3 and 500 characters.");
                didFail = true;
            }
            if(!this.selectedAuthorId){
                authorSelect.classList.add("invalid");
                this.errors.push("Author must be selected.");
                didFail = true;
            }

            if(didFail) return false;
            return true;
        },

        async createPost(){
            if(!this.checkInputValidity()) return;
            const dataToPost = {
                title: this.title,
                authorId: this.selectedAuthorId,
                body: this.content,
            }
            await this.$api.createPost(dataToPost);
            if(this.getLastPage == this.getCurrentPage) await this.$api.getPosts()
            //await this.$api.getPosts();
        },

        async editPost(){
            if(!this.checkInputValidity()) return;
            const dataToPost = {
                id: this.getCurrentPost.id,
                title: this.title,
                authorId: this.selectedAuthorId,
                created_at: this.getCurrentPost.created_at,
                body: this.content,
            };
            const response = await this.$api.editPost(dataToPost);
            await this.$api.getPosts();
        },
    },
}
</script>


<style>
    #MutateWindow{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        transition: all 0.3s ease-in-out;
    }

    .blackBg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    #CreateUserContainer {
        background-color: var(--color-surface);
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 20px;
        margin: 0 auto;
        transition: all 0.3s ease-in-out;
        z-index: 2;
    }
    .formSmallInputs{
        display: flex;
        justify-content: space-between;
    }
    .formSmallInputs input{
        width: calc(50% - 10px);
    }
    input {
        margin-bottom: 10px;
        padding: 5px;
        border: 1px solid #ccc;
        color: var(--color-text-primary);
        border-radius: var(--border-radius-small);
    }
    input:focus {
        outline: none;
        border: 1px solid #aaa;
    }
    #Content{
        resize: none;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        color: var(--color-text-primary);
        background-color: var(--color-background);
        font-family: var(--font-family);
        margin-bottom: 10px;
        height: 100px;
    }

    select {
        width: calc(50% - 10px);
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        color: var(--color-text-primary);
        background-color: #fff;
    }
    button {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: var(--color-text-primary);
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    button:hover {
        background-color: var(--color-primary-dark);
    }

    button:active {
        background-color: var(--color-text-primary);
    }

    button:focus {
        outline: none;
    }

    h2{
        margin-top: 0;
        margin-bottom: 10px;
    }

    .hidden {
        opacity: 0;
        pointer-events: none;
    }

    .disabled {
        background-color: #aaa;
        pointer-events: none;
        cursor: not-allowed;
    }
    .invalid {
        border: 1px solid var(--color-error) !important;
    }

    .MutateErrors{
        margin-bottom: 10px;
        color: var(--color-error);
    }
    .MutateErrors p {
        margin: 0;
        font-size: 14px;
    }
</style>