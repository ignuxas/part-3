<template>
    <div>
        <div v-if="!isFound">
            <h1>Article not found</h1>
            <h2>The article with the ID {{ postId }} was not found</h2>
        </div>
        <div v-else-if="isLoading && isFound">
            <h1>Loading...</h1>
        </div>
        <div v-else>
            <Delete :pushBackPage="true"/>
            <MutatePost :authors="[author]"/>
            <h1>{{ post.title }}</h1>
            <h3>{{ author.name }} |
                <span v-if="compareDates(post.updated_at, post.created_at)">{{ post.updated_at }}</span>
                <span v-else>{{ post.created_at }}</span>
            </h3>
            <p>{{ post.body }}</p>
            <div class="iconContainer">
                <div class="icon" @click="toggleDeleteWindow(post.id)">
                    <font-awesome-icon :icon="['fas', 'trash-can']" />
                </div>
                <div class="icon" @click="toggleMutateWindow(post, true)">
                    <font-awesome-icon :icon="['fas', 'pen']" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "../config.json"
import { compareDates } from "../components/handlers.vue";
import Status from "../components/Status.vue";
import Delete from "../components/Delete.vue";
import MutatePost from "../components/MutateWindow.vue";

export default {
    name: "Details",
    data(){
        return {
            post: {},
            author: {},
            postId: this.$route.params.id,
            isLoading: true,
            isFound: true,
            compareDates,
        }; 
    },
    created(){
        this.getPost()
    },
    components: {
        Status,
        Delete,
        MutatePost,
    },
    methods: {
        async getPost(){
            try {
                const response = await fetch(config.api + "/posts/" + this.postId);
                if(response.status === 404) this.isFound = false;
                else {
                    this.post = await response.json();
                    this.getAuthor(this.post.authorId);
                }
            }
            catch (error) {
                console.log(error);
                this.isFound = false;
            }
        },
        async getAuthor(authorId){
            try {
                const response = await fetch(config.api + "/authors/" + authorId);
                if  (response.status === 404) this.isFound = false;
                else this.author = await response.json();
            }
            catch (error) {
                console.log(error);
                this.isFound = false;
            }
            finally{ this.isLoading = false; }
        },
        toggleMutateWindow(post = null, editMode = false){
            this.$store.state.currentPost = post;
            this.$store.state.editMode = editMode;
            this.$store.state.showMutateWindow = !this.$store.state.showMutateWindow;
        },
        toggleDeleteWindow(id){
            this.$store.state.currentPostId = id;
            this.$store.state.showDeleteWindow = !this.$store.state.deleteWindow;
        },
    },
};
</script>