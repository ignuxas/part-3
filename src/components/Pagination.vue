<template>
    <span>#{{ number }} - </span>
</template>

<script>
export default {
    name: "pagination",
    props: {
        number: {
            type: Number,
            required: true,
        },
    },
};
</script>