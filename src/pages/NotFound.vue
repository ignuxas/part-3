<template>
    <div>
        <HomeBtn />
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
        </div>
    </div>
</template>

<script>
import HomeBtn from "../components/HomeBtn.vue";

export default {
    name: "NotFound",
    components: {
        HomeBtn,
    },
};

</script>
