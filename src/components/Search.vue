<template>
    <div id="SearchContainer">
        <form>
            <input type="text" id="SearchInput" placeholder="Search" v-model="searchInput"/>
            <button type="submit" @click.prevent="search"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
        </form>
    </div>
</template>

<script>
import api from "../config.json";

export default {
    name: "Search",
    data() {return {
        searchInput: "",
    }},
    methods: {
        async search(){
            try{
                const response = await fetch(api.api + "/posts?q=" + this.searchInput);
                const posts = await response.json();
                this.$root.$emit("updatePosts", posts);
            }  
            catch(error){console.log(error);}
        },
    },
};

</script>

<style>

#SearchContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

#SearchContainer form{
    display: flex;
}

#SearchContainer input {
    padding: 8px;
    border: 1px solid #ccc;
    height: 100%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

#SearchContainer input:focus {
    outline: none;
}

#SearchContainer button {
    height: 33px;
    aspect-ratio: 1/1;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}


</style>