<template>
    <div id="Details">
        <MutatePost :authors="[author]"/>
        <HomeBtn />
        <div v-if="!isFound">
            <h1>Article not found</h1>
            <h2>The article with the ID {{ postId }} was not found</h2>
        </div>
        <div v-else-if="isLoading && isFound">
            <h1>Loading...</h1>
        </div>
        <div v-else>
            <Delete :pushBackPage="true"/>
            <h1>{{ post.title }}</h1>
            <h3>{{ author.name }} |
                <span v-if="compareDates(post.updated_at, post.created_at)">{{ post.updated_at }}</span>
                <span v-else>{{ post.created_at }}</span>
            </h3>
            <p>{{ post.body }}</p>
            <div class="flexCenter">
                <div class="iconContainer">
                    <div class="icon" @click="toggleDeleteWindowFunc(post.id)">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                    </div>
                    <div class="icon" @click="toggleMutateWindowFunc(post, true)">
                        <font-awesome-icon :icon="['fas', 'pen']" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { compareDates } from "../handlers/handlers.js";
import { mapMutations, mapGetters } from "vuex";
import MutatePost from "../components/MutateWindow.vue";
import Delete from "../components/Delete.vue";
import HomeBtn from "../components/HomeBtn.vue";

export default {
    name: "Details",
    data(){
        return {
            postId: this.$route.params.id,
            isLoading: true,
            isFound: true,
            compareDates,
        }; 
    },
    created(){
        this.getPost();
    },
    components: {
        MutatePost,
        Delete,
        HomeBtn,
    },
    computed: {
        ...mapGetters('postData', ['getCurrentPost', 'getCurrentAuthor']),
        post(){return this.getCurrentPost;},
        author(){return this.getCurrentAuthor;},
    },
    methods: {
        ...mapMutations('mutateData', ['toggleShowMutateWindow', 'toggleShowDeleteWindow', 'setEditMode']),
        ...mapMutations('postData', ['setCurrentPost', 'setCurrentPostId']),
        async getPost(){
            console.log(this.post)
            const response = await this.$api.getPost(this.postId);
            if(!response.ok){
                this.isFound = false;
                return;
            } else { await this.getAuthor(this.post.authorId); }
            this.isLoading = false;
        },
        async getAuthor(authorId){
            await this.$api.getAuthor(authorId);
        },
        toggleMutateWindowFunc(post = null, editMode = false){
            this.setCurrentPost(post);
            this.setEditMode(editMode);
            this.toggleShowMutateWindow();
        },
        toggleDeleteWindowFunc(id){
            this.setCurrentPostId(id);
            this.toggleShowDeleteWindow();
        },
    },
};
</script>

<style scoped>
    .iconContainer{
        margin: 20px 0;
        padding: 0;
        position: relative;
        border-radius: var(--border-radius-small);
        width: fit-content;
    }

</style>