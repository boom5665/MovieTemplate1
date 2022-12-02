<template>
    <div>
        <vue-glide :breakpoints="{ 800: { perView: 2 }, 1200: { perView: 5 } }" v-model="active" v-bind="carouselOptions" v-if="movieList.length > 0">
            <template slot="control">
                <button class="arrow-right"  data-glide-dir=">"><nuxt-img src="/icon-right.png" /></button>
            </template>
            <vue-glide-slide v-for="(value, index) in movieList" :key="index"> <SingleMovieBlock :_obj="value" /></vue-glide-slide>
        </vue-glide>
    </div>
</template>

<script>
export default {
    data() {
        return {
            carouselOptions: {
                autoplay: 3000,
                hoverpause: true,
                perView: 6,
                focusAt: "center",
                type: "carousel",
                perTouch: 5,
            },

            active: 0,
            movieList: [],
        };
    },

    mounted() {
        this.getMovies();
        // console.log(this._slug);
    },
    computed: {
        _slug() {
            return this.$route.params.slug;
        },
    },
    methods: {
        // async asyncData({ params, $axios }) {
        //     const res = await $axios.$get("manga/listcate?slug=" + params.slug);
        //     const typeObj = res.result[0];
        //     return { typeObj };
        // },
        getMovies() {
            const self = this;
            this.loadingList = true;
            this.$axios
                .$post("av/listmoviesimilar", {
                    category: [],
                    perpage: 50,
                    page: 1,
                })
                .then(function (response) {
                    if (response.code == 200) {
                        // console.log(response.result);
                        self.movieList = response.result;
                        self.maxPage = response.page_total;
                    }
                    self.loadingList = false;
                });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.arrow-right {
    border: none;
    width: 83px;
    font-size: 170px;
    color: white;
    position: absolute;
    right: 0px;
    top: -3%;
    background: linear-gradient(270deg, #000000 -23.92%, rgba(0, 0, 0, 0) 152.38%);
    border-radius: 1px 0px 0px 0px;
    @media screen and (max-width: 768px) {
        display: none;
    }
    @media screen and (max-width: 576px) {
        display: none;
    }
}
</style>
