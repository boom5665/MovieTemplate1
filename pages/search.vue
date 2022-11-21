<template>
    <MovieList :_title="'รายการค้นหา'" :_isSearch="true" :_search="_search" />
</template>

<script>
export default {
    name: "search",
    head: {
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} - ค้นหา` : "ค้นหา";
        },
    },
    data() {
        return {};
    },
    computed: {
        _search() {
            return this.$route.query.s;
        },
    },
    mounted() {},
    methods: {},
};
</script>

<style>
</style>