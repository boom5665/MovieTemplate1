<template>
    <div>
        <vue-glide :breakpoints="{ 400: { perView: 1 }, 700: { perView: 1 }, 1000: { perView: 1 }, 1200: { perView: 1 } }" v-model="active" v-bind="carouselOptions" v-if="movieList.length > 0">
            <template slot="control">
                <button class="arrow-left" data-glide-dir="<"><nuxt-img src="/icon-left.png" /></button>
                <button class="arrow-right" data-glide-dir=">"><nuxt-img src="/icon-right.png" /></button>
            </template>
            <vue-glide-slide v-for="(value, index) in movieList" :key="index"> <Singleswiper :_obj="value" /></vue-glide-slide>
        </vue-glide>
    </div>
</template>

<script>
export default {
    data() {
        return {
            carouselOptions: {
                autoplay: 3000,
                perView: 1,
                focusAt: "center",
                type: "carousel",
                perTouch: 5,
                // animationDuration: 100,
            },

            active: 0,
            movieList: [],
        };
    },

    mounted() {
        this.getMovies();
    },
    methods: {
        getMovies() {
            const self = this;
            this.loadingList = true;
            this.$axios.$get("movie/poster", {}).then(function (response) {
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


<style  lang="scss" scoped>
.text-prev {
    position: relative;
    display: flex;
    justify-content: flex-end;
}
.arrow-right {
    background: transparent;
    border: none;
    font-size: 50px;
    color: white;
    position: absolute;
    right: 0px;
    top: 40%;
    @media screen and (max-width: 768px) {
        font-size: 40px;
    }
    @media screen and (max-width: 576px) {
        font-size: 30px;
    }
}
.arrow-left {
    background: transparent;
    border: none;
    font-size: 50px;
    color: white;
    position: absolute;
    left: 0px;
    top: 40%;
    @media screen and (max-width: 768px) {
        font-size: 40px;
    }
    @media screen and (max-width: 576px) {
        font-size: 30px;
    }
}
</style>
