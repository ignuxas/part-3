<template>
    <div id="pagination">
        <div id="pagination__buttons">
            <button
                id="pagination__button--prev"
                :disabled="currentPage === 1"
                @click="prevPage"
            >
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
            <button
                id="pagination__button--next"
                :disabled="currentPage === lastPage"
                @click="nextPage"
            >
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
        </div>
        <div id="pagination__info">
            <span id="pagination__info--current">
                {{ currentPage }}
            </span>
            <span id="pagination__info--total">
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
        },
        getQuantity(){
            return this.$store.state.posts.length;
        },
    }
};
</script>