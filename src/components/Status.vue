<template>
    <div id="StatusContainer" :class="{hidden: !getShowStatus, success: isSuccess(getStatus)}">
        <div v-if="isSuccess(getStatus)">
            <h1>Success</h1>
            <span>The action was completed succesfully</span>
        </div>
        <div v-else-if="getStatus === 404">
            <h1>Article not found</h1>
            <span>The article you are looking for was not found</span>
        </div>
        <div v-else-if="getStatus === 500">
            <h1>Server error</h1>
            <span>There was an error on the server</span>
        </div>
        <div v-else>
            <h1>Unknown error</h1>
            <span>An unknown error occured</span>
        </div> 
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Status",
    data(){
        return {
            action: "",
        };
    },
    computed: {
        ...mapGetters('mutateData', ["getStatus", "getShowStatus"]),
    },
    methods: {
        isSuccess(status = 400){
            return status == 200 || status === 201;
        },
    },
};
</script>

<style scoped>
    #StatusContainer{
        position: fixed;
        padding: 0 20px;
        padding-bottom: 10px;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color:rgb(238, 238, 238);
        border-radius: var(--border-radius-small);
        z-index: 4;
        border: 3px solid red;
        transition: all 0.3s ease-in-out;
        z-index: 200;
    }

    #StatusContainer.hidden{
        transform: translateX(-50%) translateY(-100%);
    }

    .success{
        border: 3px solid green !important;
    }

    h1{
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
</style>