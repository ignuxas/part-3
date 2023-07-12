<template>
    <div>
        <MutatePost :authors="authors"/>
        <div v-if="getTotalPosts == 0 && !checkAllTrue(Object.values(loading))">
            <p>There are no posts yet</p>
            <a @click.prevent="toggleMutateWindow()" class="clickable">New post</a>
        </div>
        <div v-else-if="getTotalPosts > 0 && !checkAllTrue(Object.values(loading)) && posts.length == 0">
            <Search/>
            <p>No posts were found</p>
            <a @click.prevent="toggleMutateWindow()" class="clickable">New post</a>
        </div>
        <div v-else-if="checkAllTrue(Object.values(loading))">
            <p>Loading...</p>
        </div>
        <div v-else>
            <Search/>
            <Delete/>
            <div class="postContainer">
                <div class="post" v-for="article in posts" :key="article.id">
                    <h2 @click="goToPage(article.id)">{{ article.title }}</h2>
                    <p>{{ getAuthor(article.authorId).name }}</p>
                    <p class="postDate" v-if="compareDates(article.updated_at, article.created_at)">
                        {{ article.updated_at }}
                    </p>
                    <p class="postDate" v-else>{{ article.created_at }}</p>
                    <div class="iconContainer">
                        <div class="icon" @click="toggleDeleteWindow(article.id)">
                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                        </div>
                        <div class="icon" @click="toggleMutateWindow(article, true)">
                            <font-awesome-icon :icon="['fas', 'pen']" />
                        </div>
                    </div>
                </div>
                <button id="CreateUserBtn" @click="toggleMutateWindow()">+</button>
            </div>
            <Pagination/>
        </div>
    </div>
</template>

<script>
import config from "../config.json"
import { checkAllTrue, compareDates } from "../components/handlers.vue";
import MutatePost from "../components/MutateWindow.vue";
import Search from "../components/Search.vue";
import Delete from "../components/Delete.vue";
import Pagination from "../components/Pagination.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
    name: "posts",
    components: {
        MutatePost,
        Search,
        Delete,
        Pagination,
    },
    data(){
        return {
            posts: [],
            authors: [],
            loading: {
                posts: true,
                authors: true,
            },
            checkAllTrue,
            compareDates,
        };
    },
    created(){
        this.getAuthors();
        this.getPosts();
        this.$root.$on('updatePosts', (posts) => this.getPosts(posts));
    },
    computed: {
        ...mapGetters("pageData", ["getCurrentPage", "getPostsPerPage", "getTotalPosts"]),
        ...mapGetters("mutateData", ["getShowMutateWindow", "showDeleteWindow", "getEditMode"]),
    },
    methods: {
        ...mapMutations("postData", ["setCurrentPost", "setCurrentPostId"]),
        ...mapMutations("pageData", ["setTotalPosts"]),
        ...mapMutations("mutateData", ["toggleShowMutateWindow", "toggleShowDeleteWindow", "setEditMode"]),
        async getPosts(posts){
            if (posts) { this.posts = posts; return; }
            try{
                const response = await fetch(config.api + "/posts?_page=" + this.getCurrentPage + "&_limit=" + this.getPostsPerPage);
                this.setTotalPosts(response.headers.get("X-Total-Count"))
                this.posts = await response.json();
            } catch (error) { 
                console.log(error);
            }
            finally { this.loading.posts = false; }
        },
        async getAuthors(){
            try {
                const response = await fetch(config.api + "/authors");
                this.authors = await response.json();
            }
            catch (error) {console.log(error);}
            finally {this.loading.authors = false;}
        },
        getAuthor(authorId){
            return this.authors.find((author) => author.id == authorId);
        },
        goToPage(page){
            this.$router.push({path: `details/${page}`});
        },
        toggleMutateWindow(post = null, editMode = false){
            this.setCurrentPost(post);
            this.setEditMode(editMode);
            this.toggleShowMutateWindow();
        },
        toggleDeleteWindow(id){
            this.setCurrentPostId(id);
            this.toggleShowDeleteWindow();
        },
    },
};
</script>

<style scoped>
.postContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.post {
    position: relative;
    width: 320px;
    border: 1px solid var(--color-primary-dark);
    border-radius: var(--border-radius);
    margin: 10px;
    padding: 10px;
    padding-top: 20px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    overflow: hidden;
}

.post:hover {
    background-color: var(--color-surface);
}

button{
    width: 340px;
    margin: 10px;
    padding: 10px;
    background-color: var(--color-surface);
    color: var(--color-primary-dark);
    border: 1px solid var(--color-primary-dark);
    font-size: 46px;
    font-weight: 300;
}

</style>


