<template>
    <div class="list-container">
      
        <swiper />
        <h2 class="list-title">
            {{ _title }}
        </h2>
        <div class="" v-if="movieList.length">
            <b-row>
                <b-col cols="6" lg="3" xl="2" v-for="(value, index) in movieList" :key="index">
                    <SingleMangaBlock :_obj="value" />
                </b-col>
            </b-row>
            <div class="loader-container" v-show="loadingList">
                <nuxt-img format="webp" src="/loader.png" alt="loader" />
            </div>
        </div>
        <div class="dis-between">
            <h2 class="list-title">ACTION</h2>
            <NuxtLink to="/manga/category/action" class="all">ดูทั้งหมด <b-icon-chevron-right aria-hidden="true" /></NuxtLink>
        </div>
        <div class="" v-if="movieList.length">
            <swipercate />
        </div>
        <div class="dis-between">
            <h2 class="list-title">COMEDY</h2>
            <NuxtLink to="/manga/category/comedy" class="all">ดูทั้งหมด <b-icon-chevron-right aria-hidden="true" /></NuxtLink>
        </div>
        <div class="" v-if="movieList.length">
            <swipercate />
        </div>
        <div class="dis-between">
            <h2 class="list-title">DRAMA</h2>
            <NuxtLink to="/manga/category/drama" class="all">ดูทั้งหมด <b-icon-chevron-right aria-hidden="true" /></NuxtLink>
        </div>
        <div class="" v-if="movieList.length">
            <swipercate />
        </div>
        <div class="dis-between">
            <h2 class="list-title">FANTASY</h2>
            <NuxtLink to="/manga/category/fantasy" class="all">ดูทั้งหมด <b-icon-chevron-right aria-hidden="true" /></NuxtLink>
        </div>
        <div class="" v-if="movieList.length">
            <swipercate />
        </div>
        <div class="loader-container fixed" v-show="loadingList">
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
                .$post("manga/listmovie", {
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
        getMovies() {
            const self = this;
            this.loadingList = true;
            this.$axios
                .$post("manga/listmovie", {
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
                .$post("manga/listmovie", {
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
