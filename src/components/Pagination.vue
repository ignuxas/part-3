<template>
    <div id="Pagination">
        <div id="PaginationButtons">
            <button
                id="PaginationButtonPrev"
                :disabled="getCurrentPage === 1"
                @click="prevPage"
            >
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
            <button
                id="PaginationButtonNext"
                :disabled="getCurrentPage === lastPage"
                @click="nextPage"
            >
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
        </div>
        <div id="PaginationInfo">
            <span id="paginationInfoCurrent">
                {{ getCurrentPage }}
            </span>
            <span id="PaginationInfoTotal">
                / {{ lastPage }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import api from "../plugins/api";

export default {
    name: "pagination",
    computed: {
        ...mapGetters("pageData", ["getCurrentPage", "getPostsPerPage", "getTotalPosts", "isOneItemLeft"]),
        lastPage(){return Math.ceil(this.getTotalPosts / this.getPostsPerPage);},
    },
    methods: {
        ...mapMutations("pageData", ["incrimentCurrentPage", "decrimentCurrentPage"]),
        nextPage(){
            if (this.getCurrentPage < this.lastPage) {
                this.incrimentCurrentPage();
                this.$api.getPosts();
            }
        },
        prevPage(){
            if (this.getCurrentPage > 1) {
                this.decrimentCurrentPage();
                this.$api.getPosts();
            }
        }
    }
};
</script>