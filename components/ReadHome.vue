<template>
    <div class="list-container">
        <h2 class="list-title">{{ _isSearch ? " : " + _search : "" }}</h2>
        <swiper />
        <div class="" v-if="movieList.length">
            <!-- <b-row>
                <b-col cols="6" lg="3" xl="2" v-for="(value, index) in movieList" :key="index">
                    <SingleMovieBlock :_obj="value" />
                </b-col>
            </b-row> -->
            <div class="loader-container" v-show="loadingList">
                <nuxt-img format="webp" src="/loader.png" alt="loader" />
            </div>
        </div>
        <div class="dis-between">
            <h2 class="list-title">หนังใหม่</h2>
        </div>
        <div class="" v-if="movieList">
            <swipercate />
        </div>
        <div class="dis-between">
            <h2 class="list-title">Action</h2>
        </div>
        <div class="" v-if="movieList">
            <swipercate />
        </div>
        <div class="dis-between">
            <h2 class="list-title">หนัง AV</h2>
        </div>
        <div class="" v-if="movieList">
            <swiperAV />
        </div>
        
        <div class="movie-not-found" v-else>
            <span v-show="!loadingList">ไม่พบหนัง</span>
            <div class="loader-container" v-show="loadingList">
                <nuxt-img format="webp" src="/loader.png" alt="loader" />
            </div>
        </div>
        <div class="loader-container" v-show="loadingList">
            <nuxt-img format="webp" src="/loader.png" alt="loader" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        _title: {
            type: String,
            required: true,
        },
        _type: {
            type: String,
            required: false,
            default: "",
        },
        _category: {
            type: String,
            required: false,
            default: "",
        },
        _isHot: {
            type: Boolean,
            required: false,
            default: false,
        },
        _isSearch: {
            type: Boolean,
            required: false,
            default: false,
        },
        _search: {
            type: String,
            required: false,
            default: "",
        },
        _isAV: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            loadingList: false,
            movieList: [],
            currentPage: 1,
            maxPage: 1,
        };
    },
    created() {
        if (this._isHot) {
            this.getHotMovies();
        } else if (this._isSearch) {
            this.getSearchMovie();
        } else {
            this.getMovies();
        }
    },
    mounted() {},
    watch: {
        currentPage() {
            if (this._isHot) {
                this.getMovies();
            } else if (this._isSearch) {
                this.getSearchMovie();
            } else {
                this.getHotMovies();
            }
        },
        _search() {
            this.getSearchMovie();
        },
    },
    methods: {
        getHotMovies() {
            const self = this;
            this.loadingList = true;
            this.$axios
                .$post("movie/listmovie", {
                    order: "ID",
                    orderby: "DESC",
                    types: "",
                    category: "",
                    year: 0,
                    perpage: 6,
                    page: this.currentPage,
                    search: this._search,
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
        getMovies() {
            const self = this;
            this.loadingList = true;
            this.$axios
                .$post("movie/listmovie", {
                    order: "ID",
                    orderby: "DESC",
                    types: "",
                    category: "",
                    year: 0,
                    perpage: 18,
                    page: this.currentPage,
                    search: this._search,
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
        getSearchMovie() {
            const self = this;
            this.loadingList = true;
            this.$axios
                .$post("movie/listmovie", {
                    order: "ID",
                    orderby: "DESC",
                    types: "",
                    category: "",
                    year: 0,
                    perpage: 30,
                    page: this.currentPage,
                    search: this._search,
                })
                .then(function (response) {
                    if (response.code == 200) {
                        self.movieList = response.result;
                        self.maxPage = response.page_total;
                    }
                    self.loadingList = false;
                });
        },
        checkIndex(index) {
            if ((index >= this.currentPage && index - 3 < this.currentPage) || (index <= this.currentPage && index + 3 > this.currentPage)) return true;
            return false;
        },
    },
};
</script>

<style>
</style>
