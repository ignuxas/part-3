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
            <textarea id="Content" placeholder="Contnent" v-model="content"  ></textarea>
            <button v-if="getEditMode" type="Submit" @click.prevent="editPost">Submit</button>
            <button v-else type="Submit" @click.prevent="createPost">Create</button>
        </form>
    <div class="blackBg" @click="toggleShowMutateWindow()"></div>
    </div>
</template>

<script>
import config from "../config.json";
import { mapGetters, mapMutations } from "vuex";
import { getCurrentDate } from "./handlers.vue";

export default {
    name: "MutatePost",
    data() {return {
        selectedAuthorId: null,
        title: "",
        content: "",
        status: 200,
    }},
    props: {
        authors: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapGetters("postData", ["getCurrentPost"]),
        ...mapGetters('mutateData', ["getShowMutateWindow", "getShowDeleteWindow", "getEditMode"]),
    }, 
    watch: {
        getCurrentPost(post){
            if(this.getShowMutateWindow){
                if(this.getEditMode)
                {
                    this.selectedAuthorId = post.authorId;
                    this.title = post.title;
                    this.content = post.body;
                } else {
                    this.selectedAuthorId = null;
                    this.title = "";
                    this.content = "";
                }
            }
        },
    },
    methods: {
        ...mapMutations("mutateData", ["toggleShowDeleteWindow", "toggleShowMutateWindow"]),
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

            let didFail = false;
            if(this.title.length < 3 || this.title.length > 50){
                titleInput.classList.add("invalid");
                alert("Title must be between 3 and 50 characters.");
                didFail = true;
            }
            if(this.content.length < 3 || this.content.length > 500 ){
                contentInput.classList.add("invalid");
                alert("Content must be between 3 and 500 characters.");
                didFail = true;
            }
            if(!this.selectedAuthorId){
                authorSelect.classList.add("invalid");
                alert("Please select an author.");
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
                created_at: getCurrentDate(), // should be server-side
                updated_at: getCurrentDate(), // should be server-side
                body: this.content,
            };
            try {
                const response = await fetch(config.api + "/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataToPost),
                });
                this.status = response.status;
                this.action = "created";
            } catch (error) {
                this.status = 500;
                console.log(error);
            } finally {
                this.$root.$emit("updatePosts");
                this.$root.$emit('setStatus', this.status, this.action);
            }
        },

        async editPost(){
            if(!this.checkInputValidity()) return;
                const dataToPost = {
                    title: this.title,
                    authorId: this.selectedAuthorId,
                    updated_at: getCurrentDate(), // should be server-side
                    created_at: this.getCurrentPost.created_at, // should be server-side
                    body: this.content,
                };
                console.log(dataToPost);
                try {
                    const response = await fetch(config.api + "/posts/" + this.getCurrentPost.id, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(dataToPost),
                    });
                    this.status = response.status;
                    this.action = "edited";
                } catch (error) {
                    this.status = 500;
                    console.log(error);
                } finally {
                    this.$root.$emit("updatePosts");
                    this.$root.$emit('setStatus', this.status, this.action);
                }
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
</style>