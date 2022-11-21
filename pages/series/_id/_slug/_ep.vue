<template>
    <client-only>
        <Player _type="series" :_id="_id" :_slug="_slug" :_ep="_ep" :_movieObj="movieObj" />
    </client-only>
</template>

<script>
import { mapState } from "vuex";
export default {
    layout: "play",
    async asyncData({ params, $axios, store }) {
        const res = await $axios.$post("movie/detailmovie", {
            movie_id: parseInt(params.id),
        });
        const movieObj = res.result[0];
        store.commit("setWebTitle", movieObj.full_name);
        return { movieObj };
    },
    head() {
        return {
            titleTemplate: (titleChunk) => {
                return titleChunk ? `${titleChunk} - ` + this.webTitle : this.webTitle;
            },
        };
    },
    computed: {
        ...mapState({
            SEOTitle: (state) => state.SEOTitle,
            webTitle: (state) => state.webTitle,
        }),
        _id() {
            return parseInt(this.$route.params.id);
        },
        _ep() {
            return this.$route.params.ep;
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
                movie_type: 0,
            });
        },
    },
};
</script>