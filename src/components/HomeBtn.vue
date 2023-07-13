<template>
    <div>
        <router-link id="HomeBtn" to="/posts">
            <font-awesome-icon :icon="['fas', 'house']" />
        </router-link>
        <button @click="$api.getPosts">
            test
        </button>
    </div>
</template>

<script>
export default {
    name: "HomeBtn",
};
</script>

<style>

#HomeBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    color: #ffffff;
    font-size: 22px;
    margin: 30px;
    height: 60px;
    aspect-ratio: 1/1;
    background-color: var(--color-primary);
    border-radius: 50%;
}

</style>