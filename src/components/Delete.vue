<template>
    <div id="ConfirmContainer" :class="getShowDeleteWindow ? '':'hidden'">
        <div id="ConfirmBox">
            <span>Are you sure you want to delete this post?</span>
            <p> ID: {{ getCurrentPostId }} </p>
            <div id="confirmButtons"> 
                <button id="confirmYes" @click="deletePost(getCurrentPostId)">Yes</button>
                <button id="confirmNo" @click="toggleShowDeleteWindow()">No</button>
            </div>
        </div>
        <div class="blackBg" @click="toggleShowDeleteWindow()"></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "Delete",
    computed: {
        ...mapGetters('mutateData', ["getShowDeleteWindow"]),
        ...mapGetters('postData', ["getCurrentPostId"]),
    },
    props:{
        pushBackPage: {
            type: Boolean,
            default: false,
        },
    },
    methods : {
        ...mapMutations('mutateData', ["toggleShowDeleteWindow"]),
        ...mapMutations('pageData', ["lastItemOnPageCheck"]),
        async deletePost(postId){
            const response = await this.$api.deletePost(postId);
            if (response.ok) {
                if (this.pushBackPage) this.$router.push("/posts");
                await this.$api.getPosts();
                this.toggleShowDeleteWindow();
            }
        },
    },

};
</script>

<style scoped>
    #ConfirmContainer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        transition: all 0.3s ease-in-out;
    }
    #ConfirmBox {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid black;
        border-radius: 5px;
        padding: 20px;
        z-index: 100;
    }
    #confirmButtons {
        display: flex;
        justify-content: space-between;
    }
    #confirmButtons button {
        width: 100px;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid black;
        cursor: pointer;
    }
    #confirmButtons button:hover {
        background-color: #ccc;
    }

    #ConfirmBox span{
        display: block;
        margin-bottom: 10px;
    }

    #ConfirmBox.hidden {
        transform: translate(-50%, -150%);
    }
</style>