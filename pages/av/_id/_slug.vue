<template>
    <client-only>
        <Player _type="av" :_id="_id" :_slug="_slug" :_movieObj="movieObj" :_isAV="true" />
    </client-only>
</template>

<script>
export default {
    layout: "playAV",
    name: "avSlug",
    async asyncData({ params, $axios }) {
        const res = await $axios.$post("av/detailmovie", {
            movie_id: parseInt(params.id),
        });
        const movieObj = res.result[0];
        return { movieObj };
    },
    head() {
        return {
            titleTemplate: (titleChunk) => {
                return titleChunk ? `${titleChunk} - ` + this.movieObj.full_name : this.movieObj.full_name;
            },
        };
    },
    computed: {
        _id() {
            return parseInt(this.$route.params.id);
        },
        _slug() {
            return this.$route.params.slug;
        },
    },
    mounted() {
        this.playCount();
    },
    methods: {
        playCount() {
            const self = this;
            this.$axios.$post("clipsclicker", {
                movie_id: self._id,
                movie_type: 1,
            });
        },
    },
};
</script>