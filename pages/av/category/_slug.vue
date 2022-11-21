<template>
    <client-only>
        <MovieList :_title="typeObj.name_th" :_category="_slug" :_isAV="true" />
    </client-only>
</template>

<script>
export default {
    name: "avCategorySlug",
    layout: "av",
    async asyncData({ params, $axios }) {
        const res = await $axios.$get("av/listcate?slug=" + params.slug);
        const typeObj = res.result[0];
        return { typeObj };
    },
    head() {
        return {
            titleTemplate: (titleChunk) => {
                return titleChunk ? `${titleChunk} - ` + this.typeObj.name_th : this.typeObj.name_th;
            },
        };
    },
    computed: {
        _slug() {
            return this.$route.params.slug;
        },
    },
    mounted() {},
    methods: {},
};
</script>

<style>
</style>