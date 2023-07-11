<template>
    <div id="Pagination">
        <div id="PaginationButtons">
            <button
                id="PaginationButtonPrev"
                :disabled="currentPage === 1"
                @click="prevPage"
            >
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
            <button
                id="PaginationButtonNext"
                :disabled="currentPage === lastPage"
                @click="nextPage"
            >
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
        </div>
        <div id="PaginationInfo">
            <span id="paginationInfoCurrent">
                {{ currentPage }}
            </span>
            <span id="PaginationInfoTotal">
                / {{ lastPage }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "pagination",
    computed: {
        currentPage(){return this.$store.state.currentPage;},
        postsPerPage(){return this.$store.state.postsPerPage;},
        totalPosts(){return this.$store.state.totalPosts;},
        lastPage(){return Math.ceil(this.totalPosts / this.postsPerPage);},
    },
    methods: {
        nextPage(){
            if (this.currentPage < this.lastPage) {
                this.$store.state.currentPage++;
                this.$root.$emit("updatePosts");
            }
        },
        prevPage(){
            if (this.currentPage > 1) {
                this.$store.state.currentPage--;
                this.$root.$emit("updatePosts");
            }
        }
    }
};
</script>